import AppDefinition from "../../core/AppDefinition.js";
import { icon } from "../../helpers/icons.js";

export default class RedisInsightApp extends AppDefinition {
  constructor() {
    super({
      id: "redisinsight",
      name: "Redis Insight",
      description: "GUI oficial para explorar e tunar instâncias Redis.",
      icon: icon("redis"),
      options: {
        snap: {
          label: "Snap",
          command: "sudo snap install redisinsight",
        },
        flatpak: {
          label: "Flatpak",
          command: "flatpak install -y flathub com.redis.RedisInsight",
        },
      },
    });
  }
}
