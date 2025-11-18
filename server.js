import express from "express";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4173;
const HOST = process.env.HOST || "127.0.0.1";
const publicDir = path.join(__dirname, "src");
const categoriesDir = path.join(__dirname, "src/catalog/categories");

app.use("/scripts", express.static(path.join(publicDir, "scripts")));
app.use("/styles", express.static(path.join(publicDir, "styles")));
app.use("/assets", express.static(path.join(publicDir, "assets")));
app.use(express.static(publicDir));

async function loadCatalog() {
  const entries = await fs.readdir(categoriesDir);
  const modules = [];
  for (const file of entries.filter((name) => name.endsWith(".js"))) {
    const fullPath = path.join(categoriesDir, file);
    const stats = await fs.stat(fullPath);
    const modulePath = pathToFileURL(fullPath).href;
    const fileUrl = new URL(modulePath);
    fileUrl.searchParams.set("t", String(stats.mtimeMs));
    const mod = await import(fileUrl.href);
    const definition = mod.default;
    if (definition?.handler) {
      modules.push(definition.handler());
    } else if (typeof mod.handler === "function") {
      modules.push(mod.handler());
    }
  }
  return modules.filter(Boolean).sort((a, b) => a.title.localeCompare(b.title));
}

app.get("/catalog.json", async (_req, res, next) => {
  try {
    const categories = await loadCatalog();
    res.json({ categories });
  } catch (error) {
    next(error);
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(PORT, HOST, () => {
  console.log(`brpacks rodando em http://${HOST}:${PORT}`);
});
