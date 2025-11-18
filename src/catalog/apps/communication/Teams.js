import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class TeamsApp extends AppDefinition {
  constructor() {
    super({
      id: "teams",
      name: "Microsoft Teams (PWA nativo)",
      description: "Cliente não-oficial para reuniões e chat corporativo.",
      icon: icon("microsoftteams"),
      options: {
        snap: {
          label: "Snap",
          command: "sudo snap install teams-for-linux {{VERSION}}",
          versioning: {
            type: "select",
            label: "Canal Snap",
            defaultOptionId: "stable",
            options: [
              { id: "stable", label: "Stable", value: "" },
              { id: "beta", label: "Beta", value: "--channel=beta" },
            ],
          },
        },
        flatpak: {
          label: "Flatpak",
          command:
            "flatpak install -y flathub com.github.IsmaelMartinez.teams_for_linux",
        },
      },
    });
  }
}
