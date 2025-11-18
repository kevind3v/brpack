import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class OhMyZshApp extends AppDefinition {
  constructor() {
    super({
      id: "oh-my-zsh",
      name: "Oh My Zsh",
      description: "Framework com temas e plugins para Zsh.",
      icon: icon("zigbee"),
      dependencies: ["zsh"],
      options: {
        custom: {
          label: "Instalador oficial",
          command: `sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`,
        },
      },
    });
  }
}
