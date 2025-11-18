import CategoryDefinition from "../core/CategoryDefinition.js";
import { icon } from "../helpers/icons.js";

import GitApp from "../apps/dev/Git.js";
import VSCodeApp from "../apps/dev/VSCode.js";
import JetBrainsToolboxApp from "../apps/dev/JetBrainsToolbox.js";
import DockerApp from "../apps/dev/Docker.js";
import DockerComposeApp from "../apps/dev/DockerCompose.js";
import NvmApp from "../apps/dev/Nvm.js";
import ZshApp from "../apps/dev/Zsh.js";

export const title = "Dev & DevOps";
export const categoryIcon = icon("github");

const apps = [
  new GitApp(),
  new VSCodeApp(),
  new JetBrainsToolboxApp(),
  new DockerApp(),
  new DockerComposeApp(),
  new NvmApp(),
  new ZshApp(),
];

export default new CategoryDefinition({
  title,
  icon: categoryIcon,
  apps,
});
