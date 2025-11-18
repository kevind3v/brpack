import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class DBeaverApp extends AppDefinition {
  constructor() {
    super({
      id: "dbeaver",
      name: "DBeaver Community",
      description: "Cliente SQL universal com suporte a dezenas de bancos.",
      icon: icon("dbeaver"),
      options: {
        snap: {
          label: "Snap",
          command: "sudo snap install dbeaver-ce {{VERSION}}",
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
          command: "flatpak install -y flathub io.dbeaver.DBeaverCommunity",
        },
      },
    });
  }
}
