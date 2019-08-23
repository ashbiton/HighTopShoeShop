const mongo = require("mongoose");

// basic message
module.exports = db => {
    let schema = new mongo.Schema({
        sender: { type: Number, required: true }, // id of the user that sent the message
        date: { type: String, required: true },
        time: { type: String, required: true }
    });


    schema.statics.CREATE = function (user, sendingDate) {
        const dateTime = new Date(sendingDate);
        const time = dateTime.toTimeString().substr(0,8); // format: HH:MM:MM    example: 14:03:44 
        const date = dateTime.toISOString().substr(0,10); // format: YYYY-MM-DD  example: 2019-08-21 
        return this.create({
            sender: user._id, 
            date: date,
            time: time});
    }

    db.model('Message', schema);
}