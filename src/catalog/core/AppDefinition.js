export default class AppDefinition {
  constructor({ id, name, description, icon, options }) {
    if (!id || !name) {
      throw new Error("AppDefinition requer id e name");
    }
    this.id = id;
    this.name = name;
    this.description = description ?? "";
    this.icon = icon ?? null;
    this.options = options ?? {};
  }

  handler() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      icon: this.icon,
      options: this.options,
    };
  }
}
