import CategoryDefinition from "../core/CategoryDefinition.js";
import { icon } from "../helpers/icons.js";

import TeamsApp from "../apps/communication/Teams.js";
import AnyDeskApp from "../apps/communication/AnyDesk.js";
import SlackApp from "../apps/communication/Slack.js";
import ZoomApp from "../apps/communication/Zoom.js";

export const title = "Comunicação & Remoto";
export const categoryIcon = icon("wechat");

const apps = [new TeamsApp(), new AnyDeskApp(), new SlackApp(), new ZoomApp()];

export default new CategoryDefinition({
  title,
  icon: categoryIcon,
  apps,
});
