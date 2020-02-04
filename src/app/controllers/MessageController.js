import Message from '../models/Message';
import User from '../models/User';

class MessageController {
  async store(req, res) {
    const message = await Message.create({ ...req.body, sender: req.userId });
    return res.json(message);
  }

  async fetchReceived(req, res) {
    const messages = await Message.findAll({
      where: { receiver: req.userId },
      include: [
        {
          model: User,
          as: 'senderUser',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'receiverUser',
          attributes: ['name', 'email'],
        },
      ],
    });
    return res.json(messages);
  }
}

export default new MessageController();
