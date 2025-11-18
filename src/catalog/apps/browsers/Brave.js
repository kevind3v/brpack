import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class BraveApp extends AppDefinition {
  constructor() {
    super({
      id: "brave",
      name: "Brave",
      description:
        "Navegador focado em privacidade com bloqueio nativo de anúncios.",
      icon: icon("brave"),
      options: {
        apt: {
          label: "APT (repo oficial)",
          command: `sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSLo /etc/apt/keyrings/brave-browser-archive-keyring.gpg https://brave-browser-apt-release.s3.brave.com/brave-browser-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/brave-browser-archive-keyring.gpg] https://brave-browser-apt-release.s3.brave.com/ stable main" | sudo tee /etc/apt/sources.list.d/brave-browser-release.list
sudo apt update
sudo apt install -y brave-browser{{VERSION}}`,
          versioning: {
            type: "select",
            label: "Canal",
            defaultOptionId: "stable",
            options: [
              { id: "stable", label: "Stable", value: "" },
              { id: "beta", label: "Beta", value: "-beta" },
              { id: "nightly", label: "Nightly", value: "-nightly" },
            ],
          },
        },
        snap: {
          label: "Snap",
          command: "sudo snap install brave {{VERSION}}",
          versioning: {
            type: "select",
            label: "Canal Snap",
            defaultOptionId: "stable",
            options: [
              { id: "stable", label: "Stable", value: "" },
              { id: "beta", label: "Beta", value: "--channel=beta" },
              { id: "edge", label: "Edge", value: "--channel=edge" },
            ],
          },
        },
      },
    });
  }
}
