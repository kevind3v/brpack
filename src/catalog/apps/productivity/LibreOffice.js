import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class LibreOfficeApp extends AppDefinition {
  constructor() {
    super({
      id: "libreoffice",
      name: "LibreOffice",
      description: "Suite office padrão com Writer, Calc e Impress.",
      icon: icon("libreoffice"),
      options: {
        apt: {
          label: "APT",
          command: "sudo apt install -y libreoffice{{VERSION}}",
          versioning: {
            type: "input",
            label: "Versão LibreOffice (opcional)",
            placeholder: "ex: 1:7.6.4-0ubuntu0.22.04.1",
            prefix: "=",
          },
        },
      },
    });
  }
}
