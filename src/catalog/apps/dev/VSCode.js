import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class VSCodeApp extends AppDefinition {
  constructor() {
    super({
      id: "vscode",
      name: "Visual Studio Code",
      description:
        "Editor popular com marketplace, dev containers e SSH remoto.",
      icon: icon("visualstudiocode"),
      options: {
        snap: {
          label: "Snap",
          command: "sudo snap install code --classic {{VERSION}}",
          versioning: {
            type: "select",
            label: "Canal Snap",
            defaultOptionId: "stable",
            options: [
              { id: "stable", label: "Stable", value: "" },
              { id: "beta", label: "Beta", value: "--channel=latest/beta" },
              { id: "edge", label: "Edge", value: "--channel=latest/edge" },
            ],
          },
        },
        flatpak: {
          label: "Flatpak",
          command: "flatpak install -y flathub com.visualstudio.code",
        },
      },
    });
  }
}
