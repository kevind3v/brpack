import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class ZoomApp extends AppDefinition {
  constructor() {
    super({
      id: "zoom",
      name: "Zoom",
      description: "Reuniões de vídeo com gravação na nuvem.",
      icon: icon("zoom"),
      options: {
        snap: {
          label: "Snap",
          command: "sudo snap install zoom-client",
        },
      },
    });
  }
}
