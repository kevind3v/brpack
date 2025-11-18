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
        official: {
          label: "Download oficial",
          command: `TMP_DIR=$(mktemp -d)
cd "$TMP_DIR"
URL=$(python3 - <<'PY'
import json, urllib.request
data = json.loads(urllib.request.urlopen("https://data.services.jetbrains.com/products/releases?code=TBA&latest=true&type=release").read())
print(data["TBA"][0]["downloads"]["linux"]["link"])
PY
)
if [ -z "$URL" ]; then
  echo "Não foi possível obter a versão mais recente do JetBrains Toolbox"
  exit 1
fi
wget -O toolbox.tar.gz "$URL"
tar -xzf toolbox.tar.gz
cd jetbrains-toolbox-*
./jetbrains-toolbox &
cd ~
rm -rf "$TMP_DIR"`,
        },
      },
    });
  }
}
