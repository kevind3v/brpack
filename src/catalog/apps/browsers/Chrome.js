import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class ChromeApp extends AppDefinition {
  constructor() {
    super({
      id: "chrome",
      name: "Google Chrome",
      description:
        "Navegador do Google com sincronização e suporte amplo a extensões.",
      icon: icon("googlechrome"),
      options: {
        apt: {
          label: "APT (repo oficial)",
          command: `sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo gpg --dearmor -o /etc/apt/keyrings/google-chrome.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/google-chrome.gpg] http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list
sudo apt update
sudo apt install -y google-chrome{{VERSION}}`,
          versioning: {
            type: "select",
            label: "Canal",
            defaultOptionId: "stable",
            options: [
              { id: "stable", label: "Stable", value: "-stable" },
              { id: "beta", label: "Beta", value: "-beta" },
              { id: "unstable", label: "Dev/Unstable", value: "-unstable" },
            ],
          },
        },
      },
    });
  }
}
