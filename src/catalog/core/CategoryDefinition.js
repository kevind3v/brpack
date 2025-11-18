export default class CategoryDefinition {
  constructor({ title, icon = null, apps = [] }) {
    if (!title) {
      throw new Error("CategoryDefinition requer title");
    }
    this.title = title;
    this.icon = icon;
    this.apps = apps;
  }

  handler() {
    return {
      title: this.title,
      icon: this.icon,
      apps: this.apps.map((app) =>
        typeof app.handler === "function" ? app.handler() : app
      ),
    };
  }
}
