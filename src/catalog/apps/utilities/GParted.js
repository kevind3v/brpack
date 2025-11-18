import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class GPartedApp extends AppDefinition {
  constructor() {
    super({
      id: "gparted",
      name: "GParted",
      description: "Editor gráfico de partições para SSDs/HDs.",
      icon: icon("gnome"),
      options: {
        flatpak: {
          label: "Flatpak",
          command: "flatpak install -y flathub org.gparted.GParted",
        },
      },
    });
  }
}
