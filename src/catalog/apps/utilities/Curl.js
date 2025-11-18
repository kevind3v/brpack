import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class CurlApp extends AppDefinition {
  constructor() {
    super({
      id: "curl",
      name: "curl",
      description: "Ferramenta para requisições HTTP/FTP no terminal.",
      icon: icon("curl"),
      options: {
        apt: {
          label: "APT",
          command: "sudo apt install -y curl{{VERSION}}",
          versioning: {
            type: "input",
            label: "Versão curl (opcional)",
            placeholder: "ex: 7.81.0-1ubuntu1.15",
            prefix: "=",
          },
        },
      },
    });
  }
}
