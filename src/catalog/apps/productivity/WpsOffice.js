import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class WpsOfficeApp extends AppDefinition {
  constructor() {
    super({
      id: "wps-office",
      name: "WPS Office",
      description: "Alternativa leve (equivalente ao 'WSL office').",
      options: {
        flatpak: {
          label: "Flatpak",
          command: "flatpak install -y flathub com.wps.Office",
        },
      },
    });
  }
}
