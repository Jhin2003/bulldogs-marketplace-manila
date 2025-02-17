const {User} = require("../models/User");
const Message = require("../models/Message");
const { Op } = require("sequelize");

const getMessages = async (req, res) => {
    const { userId } = req.params;  // Destructure userId from params

    try {
        // Fetch all messages where the user is either the sender or the receiver
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { receiverId: userId },  // Messages where the user is the receiver
                    { senderId: userId }     // Messages where the user is the sender
                ]
            },
            include: [
                { model: User, as: 'Sender', attributes: ['id', 'username'] },  // Include sender info
                { model: User, as: 'Receiver', attributes: ['id', 'username'] } // Include receiver info
            ]
        });
        order: [['createdAt', 'ASC']]  

        // Return the messages in the response
        res.json( messages );
    } catch (err) {
        console.error('Error fetching messages:', err);  // Debugging error
        res.status(500).json({ error: 'Error fetching messages' });
    }
};


const sendMessage = async (req, res) => {
    const { senderId, receiverId, message } = req.body;  // Extract request body data

    try {
        // Validate input
        if (!senderId || !receiverId || !message.trim()) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create a new message
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        // Return the created message in the response
        res.status(201).json(newMessage);
    } catch (err) {
        console.error("Error sending message:", err);
        res.status(500).json({ error: "Error sending message" });
    }
};




module.exports = { getMessages, sendMessage };