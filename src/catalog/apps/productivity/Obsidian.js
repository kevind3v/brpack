import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class ObsidianApp extends AppDefinition {
  constructor() {
    super({
      id: "obsidian",
      name: "Obsidian",
      description: "Notas em Markdown com graph view e plugins.",
      icon: icon("obsidian"),
      options: {
        snap: {
          label: "Snap",
          command: "sudo snap install obsidian --classic {{VERSION}}",
          versioning: {
            type: "select",
            label: "Canal Snap",
            defaultOptionId: "stable",
            options: [
              { id: "stable", label: "Stable", value: "" },
              { id: "beta", label: "Beta", value: "--channel=latest/beta" },
            ],
          },
        },
        flatpak: {
          label: "Flatpak",
          command: "flatpak install -y flathub md.obsidian.Obsidian",
        },
      },
    });
  }
}
