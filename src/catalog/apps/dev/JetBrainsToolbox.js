import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class JetBrainsToolboxApp extends AppDefinition {
  constructor() {
    super({
      id: "jetbrains-toolbox",
      name: "JetBrains Toolbox",
      description: "Gerenciador para IDEs JetBrains com updates automáticos.",
      icon: icon("jetbrains"),
      options: {
        snap: {
          label: "Snap",
          command: "sudo snap install jetbrains-toolbox --classic",
        },
      },
    });
  }
}
