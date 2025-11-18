import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class HyperApp extends AppDefinition {
  constructor() {
    super({
      id: "hyper",
      name: "Hyper",
      description: "Terminal em Electron com plugins JS.",
      icon: icon("hyper"),
      options: {
        snap: {
          label: "Snap",
          command: "sudo snap install hyper --classic {{VERSION}}",
          versioning: {
            type: "select",
            label: "Canal Snap",
            defaultOptionId: "stable",
            options: [
              { id: "stable", label: "Stable", value: "" },
              { id: "edge", label: "Edge", value: "--channel=edge" },
            ],
          },
        },
      },
    });
  }
}
