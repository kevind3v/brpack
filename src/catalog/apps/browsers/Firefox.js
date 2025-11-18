import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class FirefoxApp extends AppDefinition {
  constructor() {
    super({
      id: "firefox",
      name: "Mozilla Firefox",
      description: "Navegador estável com suporte a containers e extensões.",
      icon: icon("firefox"),
      options: {
        apt: {
          label: "APT",
          command: "sudo apt install -y firefox{{VERSION}}",
          versioning: {
            type: "input",
            label: "Versão APT (opcional)",
            placeholder: "ex: 1:1snap1-0ubuntu2",
            prefix: "=",
          },
        },
        snap: {
          label: "Snap",
          command: "sudo snap install firefox {{VERSION}}",
          versioning: {
            type: "select",
            label: "Canal Snap",
            defaultOptionId: "stable",
            options: [
              { id: "stable", label: "Stable", value: "" },
              { id: "beta", label: "Beta", value: "--channel=beta" },
              { id: "edge", label: "Edge", value: "--channel=edge" },
            ],
          },
        },
        flatpak: {
          label: "Flatpak",
          command: "flatpak install -y flathub org.mozilla.firefox",
        },
      },
    });
  }
}
