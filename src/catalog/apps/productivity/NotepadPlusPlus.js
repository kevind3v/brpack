import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class NotepadPlusPlusApp extends AppDefinition {
  constructor() {
    super({
      id: "notepad-plus-plus",
      name: "Notepad++",
      description: "Editor clássico via Wine (útil para scripts simples).",
      icon: icon("notepadplusplus"),
      options: {
        snap: {
          label: "Snap",
          command: "sudo snap install notepad-plus-plus {{VERSION}}",
          versioning: {
            type: "select",
            label: "Canal Snap",
            defaultOptionId: "stable",
            options: [
              { id: "stable", label: "Stable (Wine)", value: "" },
              { id: "beta", label: "Beta", value: "--channel=beta" },
            ],
          },
        },
        flatpak: {
          label: "Flatpak",
          command:
            "flatpak install -y flathub com.notepad_plus_plus.NotepadPlusPlus",
        },
      },
    });
  }
}
