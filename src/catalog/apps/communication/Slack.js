import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class SlackApp extends AppDefinition {
  constructor() {
    super({
      id: "slack",
      name: "Slack",
      description: "Comunicação corporativa com integrações a bots e apps.",
      icon: icon("slack"),
      options: {
        snap: {
          label: "Snap",
          command: "sudo snap install slack --classic {{VERSION}}",
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
          command: "flatpak install -y flathub com.slack.Slack",
        },
      },
    });
  }
}
