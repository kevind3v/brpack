import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class OnlyOfficeApp extends AppDefinition {
  constructor() {
    super({
      id: "onlyoffice",
      name: "OnlyOffice",
      description: "Suite compatível com OOXML e colaboração em tempo real.",
      icon: icon("onlyoffice"),
      options: {
        snap: {
          label: "Snap",
          command: "sudo snap install onlyoffice-desktopeditors {{VERSION}}",
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
          command: "flatpak install -y flathub org.onlyoffice.desktopeditors",
        },
      },
    });
  }
}
