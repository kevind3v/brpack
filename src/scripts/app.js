const $ = window.jQuery;
const FALLBACK_ICON =
  "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@15.21.0/icons/myget.svg";
const SELECTION_BLOCKERS = ".app-controls, select, input:not(.sr-only-checkbox)";

const state = {
  filter: "",
  selections: new Map(),
  appState: new Map(),
  catalog: [],
};

const appIndex = new Map();

const dom = {};

async function init() {
  if (!$) {
    throw new Error("jQuery não foi carregado. Verifique o index.html.");
  }
  cacheDom();
  bindEvents();
  try {
    await hydrateCatalog();
    renderCatalog();
    refreshControls();
  } catch (error) {
    console.error(error);
    dom.$emptyState
      .removeClass("hidden")
      .text("Não foi possível carregar o catálogo. Tente novamente.");
  }
}

async function hydrateCatalog() {
  const response = await fetch("/catalog.json");
  if (!response.ok) {
    throw new Error("Não foi possível carregar o catálogo");
  }
  const payload = await response.json();
  state.catalog = payload.categories ?? [];
  state.selections.clear();
  state.appState.clear();
  appIndex.clear();
  state.catalog.forEach((category) =>
    (category.apps ?? []).forEach((app) => appIndex.set(app.id, app))
  );
}

function cacheDom() {
  dom.$catalog = $("#catalog");
  dom.$output = $("#script-output");
  dom.$download = $("#download-script");
  dom.$generate = $("#generate-script");
  dom.$copy = $("#copy-script");
  dom.$clear = $("#clear-selection");
  dom.$search = $("#search-input");
  dom.$emptyState = $("#empty-state");
  dom.$modal = $("#script-modal");
  dom.$closeModal = $("#close-modal");
}

function bindEvents() {
  dom.$catalog
    .on("change", ".sr-only-checkbox", handleToggleApp)
    .on("change", ".js-method-select", handleMethodChange)
    .on("change", ".js-version-select", handleVersionSelect)
    .on("input", ".js-version-text", handleVersionInput)
    .on("click", ".app-item", handleCardClick)
    .on("click", ".category-toggle", handleCategoryToggle)
    .on("error", ".app-icon", handleIconError);

  dom.$search.on("input", handleSearch);
  dom.$clear.on("click", handleClear);
  dom.$generate.on("click", handleGenerate);
  dom.$download.on("click", handleDownload);
  dom.$copy.on("click", handleCopy);

  dom.$closeModal.on("click", closeModal);
  dom.$modal.on("click", (event) => {
    if (event.target === dom.$modal[0]) {
      closeModal();
    }
  });

  $(document).on("keydown", (event) => {
    if (event.key === "Escape" && dom.$modal.hasClass("open")) {
      closeModal();
    }
  });
}

function handleToggleApp(event) {
  const appId = $(event.currentTarget).data("appId");
  toggleAppSelection(appId, event.currentTarget.checked);
}

function handleMethodChange(event) {
  const $select = $(event.currentTarget);
  const $card = $select.closest(".app-item");
  const appId = $card.data("appId");
  const app = appIndex.get(appId);
  if (!app) return;

  const methodKey = $select.val();
  const appState = getAppState(app);
  appState.method = methodKey;
  appState.version = getDefaultVersion(app.options[methodKey]);

  renderVersionControl($card.find(".app-version"), app, methodKey, appState);
  syncSelection(appId);
}

function handleVersionSelect(event) {
  const $el = $(event.currentTarget);
  const appId = $el.closest(".app-item").data("appId");
  updateVersion(appId, $el.val());
}

function handleVersionInput(event) {
  const $el = $(event.currentTarget);
  const appId = $el.closest(".app-item").data("appId");
  updateVersion(appId, $el.val());
}

function handleCardClick(event) {
  const $target = $(event.target);
  if (
    $target.closest(SELECTION_BLOCKERS).length ||
    $target.closest(".app-trigger").length
  ) {
    return;
  }

  const $card = $(event.currentTarget);
  const $checkbox = $card.find(".sr-only-checkbox");
  const nextValue = !$checkbox.prop("checked");
  $checkbox.prop("checked", nextValue).trigger("change");
}

function handleCategoryToggle(event) {
  event.stopPropagation();
  const $btn = $(event.currentTarget);
  const $category = $btn.closest(".category");
  const $apps = $category.children(".apps");
  const isCollapsed = $category.hasClass("collapsed");

  if (isCollapsed) {
    $category.removeClass("collapsed");
    $apps.stop(true, true).slideDown(180);
    $btn.text("Recolher").attr("aria-expanded", "true");
  } else {
    $category.addClass("collapsed");
    $apps.stop(true, true).slideUp(180);
    $btn.text("Expandir").attr("aria-expanded", "false");
  }
}

function handleIconError(event) {
  const $img = $(event.currentTarget);
  if ($img.data("fallbackApplied")) return;
  $img.attr("src", FALLBACK_ICON).data("fallbackApplied", true);
}

function handleSearch(event) {
  state.filter = event.currentTarget.value.trim();
  renderCatalog();
}

function handleClear() {
  state.selections.clear();
  state.appState.clear();
  state.filter = "";
  dom.$search.val("");
  dom.$output.val("");
  closeModal();
  renderCatalog();
  refreshControls();
}

function handleGenerate() {
  const script = buildScript();
  if (!script) return;
  dom.$output.val(script);
  dom.$download.prop("disabled", false);
  dom.$copy.prop("disabled", false);
  openModal();
}

function handleDownload() {
  const script = dom.$output.val().trim();
  if (!script) return;
  const blob = new Blob([script], { type: "text/x-shellscript" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "installer.sh";
  anchor.click();
  URL.revokeObjectURL(url);
}

async function handleCopy() {
  const script = dom.$output.val().trim();
  if (!script) return;
  try {
    await navigator.clipboard.writeText(script);
    dom.$copy.text("Copiado!");
    setTimeout(() => dom.$copy.text("Copiar"), 2000);
  } catch (error) {
    console.error("Clipboard error", error);
  }
}

function openModal() {
  dom.$modal.addClass("open");
  $("body").addClass("modal-open");
}

function closeModal() {
  dom.$modal.removeClass("open");
  $("body").removeClass("modal-open");
}

function toggleAppSelection(appId, enabled) {
  const app = appIndex.get(appId);
  if (!app) return;

  const $card = dom.$catalog.find(`.app-item[data-app-id="${appId}"]`);
  const appState = getAppState(app);

  if (enabled) {
    state.selections.set(appId, {
      app,
      method: appState.method,
      version: appState.version,
    });
    $card.addClass("selected");
    renderVersionControl($card.find(".app-version"), app, appState.method, appState);
  } else {
    state.selections.delete(appId);
    $card.removeClass("selected");
  }

  refreshControls();
}

function renderCatalog() {
  const term = state.filter.toLowerCase();
  const fragments = [];

  state.catalog.forEach((category) => {
    const apps = category.apps.filter((app) =>
      !term
        ? true
        : app.name.toLowerCase().includes(term) ||
          app.description.toLowerCase().includes(term)
    );

    if (!apps.length) {
      return;
    }

    fragments.push(buildCategory(category.title, category.icon, apps));
  });

  dom.$catalog.empty().append(fragments);
  toggleEmptyState(fragments.length === 0);
}

function buildCategory(title, categoryIcon, apps) {
  const $category = $(`
    <div class="category" data-category="${escapeHtml(title)}">
      <div class="category__header">
        <div class="category__title">
          ${categoryIcon ? `<img src="${escapeHtml(categoryIcon)}" class="category-icon" alt="" aria-hidden="true" />` : ""}
          <h3>${escapeHtml(title)}</h3>
        </div>
        <button type="button" class="category-toggle" aria-expanded="true">Recolher</button>
      </div>
      <div class="apps"></div>
    </div>
  `);

  const $apps = $category.find(".apps");
  apps.forEach((app) => {
    $apps.append(buildAppCard(app));
  });

  return $category;
}

function buildAppCard(app) {
  const appState = getAppState(app);
  const isSelected = state.selections.has(app.id);
  const methodOptions = buildMethodOptions(app, appState.method);
  const singleMethod = Object.keys(app.options).length === 1 ? "disabled" : "";
  const versionVisibility = hasVersioning(app, appState.method) ? "" : "hidden";

  const $card = $(`
    <div class="app-item ${isSelected ? "selected" : ""}" data-app-id="${app.id}">
      <label class="app-trigger">
        <input type="checkbox" class="sr-only-checkbox" data-app-id="${app.id}" ${
    isSelected ? "checked" : ""
  } />
        <div class="app-info">
          <img class="app-icon" src="${app.icon || FALLBACK_ICON}" alt="Logo ${escapeHtml(
    app.name
  )}" loading="lazy" />
          <div class="app-overview">
            <span>${escapeHtml(app.name)}</span>
            <small>${escapeHtml(app.description)}</small>
          </div>
        </div>
      </label>
      <div class="app-controls">
        <div class="app-method">
          <select class="js-method-select" ${singleMethod}>${methodOptions}</select>
        </div>
        <div class="app-version ${versionVisibility}"></div>
      </div>
    </div>
  `);

  renderVersionControl($card.find(".app-version"), app, appState.method, appState);
  return $card;
}

function buildMethodOptions(app, selectedKey) {
  return Object.entries(app.options)
    .map(
      ([key, method]) =>
        `<option value="${escapeHtml(key)}" ${
          key === selectedKey ? "selected" : ""
        }>${escapeHtml(method.label)}</option>`
    )
    .join("");
}

function hasVersioning(app, methodKey) {
  return Boolean(app.options[methodKey]?.versioning);
}

function renderVersionControl($container, app, methodKey, appState) {
  const method = app.options[methodKey];
  const versioning = method?.versioning;

  if (!versioning) {
    $container.empty().addClass("hidden");
    return;
  }

  $container.removeClass("hidden");
  const label = $('<label class="version-label"></label>').text(
    versioning.label
  );

  if (versioning.type === "select") {
    const options = (versioning.options ?? []).map((option) => {
      return `<option value="${escapeHtml(option.id)}">${escapeHtml(
        option.label
      )}</option>`;
    });
    let currentValue = appState.version;
    const valid = (versioning.options ?? []).some(
      (option) => option.id === currentValue
    );
    if (!valid) {
      currentValue =
        versioning.defaultOptionId ?? versioning.options?.[0]?.id ?? "";
      appState.version = currentValue;
    }

    const select = $(
      `<select class="js-version-select">${options.join("")}</select>`
    );
    select.val(currentValue);
    label.append(select);
  } else {
    const input = $('<input type="text" class="js-version-text" />');
    input.attr("placeholder", versioning.placeholder ?? "");
    input.val(appState.version ?? "");
    label.append(input);
  }

  $container.empty().append(label);
}

function toggleEmptyState(isEmpty) {
  if (isEmpty) {
    dom.$emptyState
      .removeClass("hidden")
      .html(
        state.filter
          ? `Nenhum app encontrado para "<strong>${escapeHtml(
              state.filter
            )}</strong>".`
          : "Nada para mostrar."
      );
  } else {
    dom.$emptyState.addClass("hidden").empty();
  }
}

function getDefaultMethod(app) {
  return Object.keys(app.options)[0];
}

function getDefaultVersion(methodConfig) {
  if (!methodConfig?.versioning) {
    return null;
  }
  if (methodConfig.versioning.type === "select") {
    return (
      methodConfig.versioning.defaultOptionId ??
      methodConfig.versioning.options?.[0]?.id ??
      null
    );
  }
  return "";
}

function getAppState(app) {
  if (!state.appState.has(app.id)) {
    const method = getDefaultMethod(app);
    state.appState.set(app.id, {
      method,
      version: getDefaultVersion(app.options[method]),
    });
  }
  return state.appState.get(app.id);
}

function updateVersion(appId, value) {
  const app = appIndex.get(appId);
  if (!app) return;
  const appState = getAppState(app);
  appState.version = value;
  syncSelection(appId);
}

function syncSelection(appId) {
  if (!state.selections.has(appId)) {
    return;
  }
  const app = appIndex.get(appId);
  const snapshot = getAppState(app);
  state.selections.set(appId, {
    app,
    method: snapshot.method,
    version: snapshot.version,
  });
}

function refreshControls() {
  const hasSelection = state.selections.size > 0;
  dom.$generate.prop("disabled", !hasSelection);
  if (!hasSelection) {
    dom.$download.prop("disabled", true);
    dom.$copy.prop("disabled", true);
  }
}

function buildScript() {
  if (state.selections.size === 0) {
    alert("Selecione ao menos um aplicativo.");
    return "";
  }

  const aptCommands = [];
  const snapCommands = [];
  const flatpakCommands = [];
  const customCommands = [];

  state.selections.forEach(({ app, method, version }) => {
    const methodConfig = app.options[method];
    if (!methodConfig) return;

    const versionValue = getVersionValue(methodConfig, version);
    const resolvedCommand = resolveCommand(methodConfig.command, versionValue);
    const commandWithComment = `echo "Instalando ${app.name} (${methodConfig.label})"\n${resolvedCommand}`;

    if (method === "apt") {
      aptCommands.push(commandWithComment);
    } else if (method === "snap") {
      snapCommands.push(commandWithComment);
    } else if (method === "flatpak") {
      flatpakCommands.push(commandWithComment);
    } else {
      customCommands.push(commandWithComment);
    }
  });

  const lines = [
    "#!/bin/bash",
    "set -euo pipefail",
    "",
    'echo "----- brpacks installer -----"',
    'echo "Aplicando atualizações e preparando dependências"',
    "",
  ];

  const needsAptPrep =
    aptCommands.length > 0 ||
    snapCommands.length > 0 ||
    flatpakCommands.length > 0;

  if (needsAptPrep) {
    lines.push('echo "Atualizando repositórios APT e instalando bases"');
    lines.push("sudo apt update");
    lines.push(
      "sudo apt install -y ca-certificates curl software-properties-common gnupg"
    );
    lines.push("");
  }

  if (aptCommands.length) {
    aptCommands.forEach((cmd) => lines.push(cmd, ""));
  }

  if (snapCommands.length) {
    lines.push("if ! command -v snap >/dev/null 2>&1; then");
    lines.push('  echo "Instalando snapd..."');
    lines.push("  sudo apt install -y snapd");
    lines.push("  sudo systemctl enable --now snapd.socket");
    lines.push("fi");
    lines.push("");
    snapCommands.forEach((cmd) => lines.push(cmd, ""));
  }

  if (flatpakCommands.length) {
    lines.push("if ! command -v flatpak >/dev/null 2>&1; then");
    lines.push('  echo "Instalando flatpak..."');
    lines.push("  sudo apt install -y flatpak");
    lines.push("fi");
    lines.push(
      "sudo flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo"
    );
    lines.push("");
    flatpakCommands.forEach((cmd) => lines.push(cmd, ""));
  }

  if (customCommands.length) {
    lines.push("# Bloco de comandos personalizados");
    customCommands.forEach((cmd) => lines.push(cmd, ""));
  }

  lines.push('echo "Instalação concluída!"');
  return lines.join("\n");
}

function getVersionValue(methodConfig, versionSelection) {
  const versioning = methodConfig.versioning;
  if (!versioning) {
    return "";
  }

  if (versioning.type === "select") {
    const option = versioning.options?.find(
      (entry) => entry.id === versionSelection
    );
    return option?.value ?? "";
  }

  const raw = versionSelection?.trim();
  if (!raw) {
    return "";
  }
  const prefix = versioning.prefix ?? "";
  const suffix = versioning.suffix ?? "";
  return `${prefix}${raw}${suffix}`;
}

function resolveCommand(template, versionValue) {
  if (template.includes("{{VERSION}}")) {
    return template.replaceAll("{{VERSION}}", versionValue || "");
  }
  if (versionValue) {
    return `${template} ${versionValue}`.trim();
  }
  return template;
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

$(init);
