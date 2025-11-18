import CategoryDefinition from "../core/CategoryDefinition.js";
import { icon } from "../helpers/icons.js";

import DBeaverApp from "../apps/data/DBeaver.js";
import PostmanApp from "../apps/data/Postman.js";
import RedisInsightApp from "../apps/data/RedisInsight.js";
import SQLyogApp from "../apps/data/SQLyog.js";
import InsomniaApp from "../apps/data/Insomnia.js";

export const title = "Bancos de Dados & APIs";
export const categoryIcon = icon("postgresql");

const apps = [
  new DBeaverApp(),
  new PostmanApp(),
  new RedisInsightApp(),
  new SQLyogApp(),
  new InsomniaApp(),
];

export default new CategoryDefinition({
  title,
  icon: categoryIcon,
  apps,
});
