const mongo = require("mongoose");

// extends message to have the unlike and like responses and text
module.exports = db => {
    const MessageModel = db.model('Message');
    const LikeUnlike = db.model('LikeUnlike');

    let schema = new mongo.Schema({
        responses: [mongo.Types.ObjectId], // IDs of the like and unlike messages
        text: { type: String, required: true },
    });

    schema.methods.LIKES_COUNT = async function () {
        return LikeUnlike.count({ _id: { $in: responses }, state: true }).exec();
    }

    schema.methods.UNLIKES_COUNT = async function () {
        return LikeUnlike.count({ _id: { $in: responses }, state: false }).exec();
    }
    
    schema.methods.LIKES = async function () {
        return LikeUnlike.find({ _id: { $in: responses }, state: true }).exec();
    }

    schema.methods.UNLIKES = async function () {
        return LikeUnlike.find({ _id: { $in: responses }, state: false }).exec();
    }

    MessageModel.discriminator('Post', schema);
}