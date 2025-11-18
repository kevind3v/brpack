import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class HtopApp extends AppDefinition {
  constructor() {
    super({
      id: "htop",
      name: "htop",
      description: "Monitor visual dos processos e recursos do sistema.",
      icon: icon("linux"),
      options: {
        apt: {
          label: "APT",
          command: "sudo apt install -y htop{{VERSION}}",
          versioning: {
            type: "input",
            label: "Versão htop (opcional)",
            placeholder: "ex: 3.2.1-1",
            prefix: "=",
          },
        },
      },
    });
  }
}
