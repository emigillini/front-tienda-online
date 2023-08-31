import { messagesModel } from "../models/message_model.js";
import { logger } from "../../logger.js";

export class MessageManagerBD {
  constructor() {
    this.model = messagesModel;
  }

  async addMessages(data) {
    try {
      const { user, message } = data;
      const newMessage = await this.model.create({ user, message });
      return newMessage;
    } catch (error) {
      logger.error ("Error al guardar el mensaje:", error);
    }
  }

  async deleteMessages() {
    try {
      await this.model.deleteMany({});
      logger.info("mensajes eliminados correctamente");
    } catch (error) {
      logger.error  ("Error al guardar el mensaje:", error);
    }
  }
}
