import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class CiderApp extends AppDefinition {
  constructor() {
    super({
      id: "cider",
      name: "Cider (Apple Music)",
      description: "Cliente Apple Music open source — substitui o antigo iTunes.",
      icon: icon("applemusic"),
      options: {
        flatpak: {
          label: "Flatpak",
          command: "flatpak install -y flathub sh.cider.Cider",
        },
      },
    });
  }
}
