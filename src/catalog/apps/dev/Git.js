import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class GitApp extends AppDefinition {
  constructor() {
    super({
      id: "git",
      name: "Git",
      description: "Controle de versão distribuído para qualquer fluxo.",
      icon: icon("git"),
      options: {
        apt: {
          label: "APT",
          command: "sudo apt install -y git{{VERSION}}",
          versioning: {
            type: "input",
            label: "Versão específica (opcional)",
            placeholder: "ex: 1:2.43.0-1ubuntu2",
            prefix: "=",
          },
        },
      },
    });
  }
}
