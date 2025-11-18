import CategoryDefinition from "../core/CategoryDefinition.js";
import { icon } from "../helpers/icons.js";

import HyperApp from "../apps/utilities/Hyper.js";
import CurlApp from "../apps/utilities/Curl.js";
import HtopApp from "../apps/utilities/Htop.js";
import GPartedApp from "../apps/utilities/GParted.js";

export const title = "Terminais & Utilitários";
export const categoryIcon = icon("gnometerminal");

const apps = [new HyperApp(), new CurlApp(), new HtopApp(), new GPartedApp()];

export default new CategoryDefinition({
  title,
  icon: categoryIcon,
  apps,
});
