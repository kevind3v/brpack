import CategoryDefinition from "../core/CategoryDefinition.js";
import { icon } from "../helpers/icons.js";

import EdgeApp from "../apps/browsers/Edge.js";
import BraveApp from "../apps/browsers/Brave.js";
import OperaApp from "../apps/browsers/Opera.js";
import ChromeApp from "../apps/browsers/Chrome.js";
import FirefoxApp from "../apps/browsers/Firefox.js";

export const title = "Navegadores";
export const categoryIcon = icon("googlechrome");

const apps = [
  new EdgeApp(),
  new BraveApp(),
  new OperaApp(),
  new ChromeApp(),
  new FirefoxApp(),
];

export default new CategoryDefinition({
  title,
  icon: categoryIcon,
  apps,
});
