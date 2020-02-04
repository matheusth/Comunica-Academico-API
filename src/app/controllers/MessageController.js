import Message from '../models/Message';

class MessageController {
  async store(req, res) {
    const message = await Message.create(req.body);
    return res.json(message);
  }
}

export default new MessageController();
