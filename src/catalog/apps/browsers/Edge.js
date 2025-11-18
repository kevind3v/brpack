import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class EdgeApp extends AppDefinition {
  constructor() {
    super({
      id: "edge",
      name: "Microsoft Edge",
      description:
        "Browser com collections, perfis e sincronização Microsoft 365.",
      icon: icon("microsoftedge"),
      options: {
        apt: {
          label: "APT (repo oficial)",
          command: `sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | sudo gpg --dearmor -o /etc/apt/keyrings/microsoft.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/microsoft.gpg] https://packages.microsoft.com/repos/edge stable main" | sudo tee /etc/apt/sources.list.d/microsoft-edge.list
sudo apt update
sudo apt install -y microsoft-edge{{VERSION}}`,
          versioning: {
            type: "select",
            label: "Canal",
            defaultOptionId: "stable",
            options: [
              { id: "stable", label: "Stable", value: "-stable" },
              { id: "beta", label: "Beta", value: "-beta" },
              { id: "dev", label: "Dev", value: "-dev" },
            ],
          },
        },
        flatpak: {
          label: "Flatpak",
          command: "flatpak install -y flathub com.microsoft.Edge",
        },
      },
    });
  }
}
