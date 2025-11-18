import CategoryDefinition from "../core/CategoryDefinition.js";
import { icon } from "../helpers/icons.js";

import OnlyOfficeApp from "../apps/productivity/OnlyOffice.js";
import LibreOfficeApp from "../apps/productivity/LibreOffice.js";
import WpsOfficeApp from "../apps/productivity/WpsOffice.js";
import CiderApp from "../apps/productivity/Cider.js";
import ObsidianApp from "../apps/productivity/Obsidian.js";
import NotepadPlusPlusApp from "../apps/productivity/NotepadPlusPlus.js";

export const title = "Produtividade & Escritório";
export const categoryIcon = icon("notion");

const apps = [
  new OnlyOfficeApp(),
  new LibreOfficeApp(),
  new WpsOfficeApp(),
  new CiderApp(),
  new ObsidianApp(),
  new NotepadPlusPlusApp(),
];

export default new CategoryDefinition({
  title,
  icon: categoryIcon,
  apps,
});
