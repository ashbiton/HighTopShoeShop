const mongo = require("mongoose");

// extends message - the model is called LikeUnlike
module.exports = db => {
    let MessageModel = db.model('Message');
    let schema = new mongo.Schema({
        // true = like , false = unlike
        state: {type: Boolean , required: true , default: true}, 
    });

    MessageModel.discriminator('LikeUnlike', schema);
}