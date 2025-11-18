import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class InsomniaApp extends AppDefinition {
  constructor() {
    super({
      id: "insomnia",
      name: "Insomnia",
      description: "Client open source para REST/GraphQL com sync opcional.",
      icon: icon("insomnia"),
      options: {
        snap: {
          label: "Snap",
          command: "sudo snap install insomnia {{VERSION}}",
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
          command: "flatpak install -y flathub rest.insomnia.Insomnia",
        },
      },
    });
  }
}
