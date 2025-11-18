import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class SQLyogApp extends AppDefinition {
  constructor() {
    super({
      id: "sqlyog",
      name: "SQLyog (referência)",
      description:
        "Ferramenta clássica para MySQL/MariaDB. Sem pacote Linux oficial.",
      icon: icon("mysql"),
      options: {
        custom: {
          label: "Manual",
          command: `echo "SQLyog não possui instalador oficial para Linux."
echo "Use alternativas nativas (ex: DBeaver) ou baixe o AppImage via https://github.com/webyog/sqlyog-community/wiki/Linux."`,
        },
      },
    });
  }
}
