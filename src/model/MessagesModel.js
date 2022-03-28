const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema({
	message_text: {
		type: String,
		required: true,
		maxlength: 1024,
		minlength: 1,
	},
	owner_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	receiver_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	created_date: {
		type: Date,
		default: new Date(),
	},
});

const messages = mongoose.model("messages", messagesSchema);

module.exports = messages;
