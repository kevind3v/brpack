import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class OperaApp extends AppDefinition {
  constructor() {
    super({
      id: "opera",
      name: "Opera",
      description: "Navegador com VPN embutida e integrações de mensageria.",
      icon: icon("opera"),
      options: {
        apt: {
          label: "APT (repo oficial)",
          command: `sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://deb.opera.com/archive.key | sudo gpg --dearmor -o /etc/apt/keyrings/opera-browser.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/opera-browser.gpg] https://deb.opera.com/opera-stable/ stable non-free" | sudo tee /etc/apt/sources.list.d/opera-stable.list
sudo apt update
sudo apt install -y opera-stable`,
        },
        snap: {
          label: "Snap",
          command: "sudo snap install opera",
        },
      },
    });
  }
}
