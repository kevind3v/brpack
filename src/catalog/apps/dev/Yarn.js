import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class YarnApp extends AppDefinition {
  constructor() {
    super({
      id: "yarn",
      name: "Yarn",
      description: "Gerenciador de pacotes alternativo ao npm (suporte PnP).",
      icon: icon("yarn"),
      options: {
        apt: {
          label: "APT (repo Yarn)",
          command: `curl -fsSL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo gpg --dearmor -o /etc/apt/keyrings/yarn.gpg
echo "deb [signed-by=/etc/apt/keyrings/yarn.gpg] https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install -y yarn{{VERSION}}`,
          versioning: {
            type: "input",
            label: "Versão Yarn (opcional)",
            placeholder: "ex: 1.22.22-1",
            prefix: "=",
          },
        },
        corepack: {
          label: "Corepack (Node 16+)",
          command: "corepack enable && corepack prepare yarn@stable --activate",
        },
      },
    });
  }
}
