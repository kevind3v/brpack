import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class DockerComposeApp extends AppDefinition {
  constructor() {
    super({
      id: "docker-compose",
      name: "Docker Compose",
      description: "Orquestração declarativa de múltiplos serviços.",
      icon: icon("docker"),
      options: {
        apt: {
          label: "APT",
          command: "sudo apt install -y docker-compose{{VERSION}}",
          versioning: {
            type: "input",
            label: "Versão compose (opcional)",
            placeholder: "ex: 1.29.2-1",
            prefix: "=",
          },
        },
      },
    });
  }
}
