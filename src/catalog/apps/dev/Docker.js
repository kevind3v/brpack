import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class DockerApp extends AppDefinition {
  constructor() {
    super({
      id: "docker",
      name: "Docker Engine",
      description: "Runtime de containers para workloads Linux.",
      icon: icon("docker"),
      options: {
        apt: {
          label: "APT",
          command:
            "sudo apt install -y docker.io{{VERSION}} && sudo systemctl enable --now docker",
          versioning: {
            type: "input",
            label: "Versão docker.io (opcional)",
            placeholder: "ex: 20.10.21-0ubuntu1",
            prefix: "=",
          },
        },
      },
    });
  }
}
