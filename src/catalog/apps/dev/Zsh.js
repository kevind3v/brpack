import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class ZshApp extends AppDefinition {
  constructor() {
    super({
      id: "zsh",
      name: "Zsh",
      description: "Shell avançada compatível com temas (Oh My Zsh, Starship).",
      icon: icon("zsh"),
      options: {
        apt: {
          label: "APT",
          command: "sudo apt install -y zsh{{VERSION}}",
          versioning: {
            type: "input",
            label: "Versão Zsh (opcional)",
            placeholder: "ex: 5.9-7ubuntu0.1",
            prefix: "=",
          },
        },
      },
    });
  }
}
