import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class PostmanApp extends AppDefinition {
  constructor() {
    super({
      id: "postman",
      name: "Postman",
      description: "Plataforma colaborativa para APIs.",
      icon: icon("postman"),
      options: {
        snap: {
          label: "Snap",
          command: "sudo snap install postman",
        },
        flatpak: {
          label: "Flatpak",
          command: "flatpak install -y flathub com.getpostman.Postman",
        },
      },
    });
  }
}
