import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // TODO:Socket.io will go here

    await Promise.all([newMessage.save(), conversation.save()]);

    res.status(201).json(newMessage);

    // res.status(200).json({ message: `message sent to id ${id}` });
  } catch (error) {
    console.error('Error in sendMessage controller ', error.message);
    res.status(500).json({ error: 'internal server error' });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate('messages');

    if (!conversation) {
      res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error('Error in getMessage controller ', error.message);
    res.status(500).json({ error: 'internal server error' });
  }
};
