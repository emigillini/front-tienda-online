import { messagesModel } from "./models/message_model.js";

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
      console.error("Error al guardar el mensaje:", error);
    }
  }

  async deleteMessages() {
    try {
      await this.model.deleteMany({});
      console.log("mensajes eliminados correctamente");
    } catch (error) {
      console.error("Error al guardar el mensaje:", error);
    }
  }
}
