import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class AnyDeskApp extends AppDefinition {
  constructor() {
    super({
      id: "anydesk",
      name: "AnyDesk",
      description: "Acesso remoto leve com suporte a múltiplas plataformas.",
      icon: icon("anydesk"),
      options: {
        flatpak: {
          label: "Flatpak",
          command: "flatpak install -y flathub com.anydesk.Anydesk",
        },
      },
    });
  }
}
