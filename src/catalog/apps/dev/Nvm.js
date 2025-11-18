import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class NvmApp extends AppDefinition {
  constructor() {
    super({
      id: "nvm",
      name: "NVM (Node Version Manager)",
      description: "Gerencie múltiplas versões do Node.js/NPM facilmente.",
      icon: icon("nodedotjs"),
      options: {
        custom: {
          label: "Script oficial",
          command: `curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
echo "Reabra o terminal ou execute 'source ~/.nvm/nvm.sh' para carregar o nvm."`,
        },
      },
    });
  }
}
