const debug = require("debug")("mongo:model-user");
const mongo = require("mongoose");

module.exports = db => {
    const Manager = db.model('Manager');
    const User = db.model('User');
    let schema = new mongo.Schema({
        name: { type: String, required: true },    // name of the group 
        messages: [mongo.Types.ObjectId],          // all the messages sent
        manager: { type: Number, required: true }, // id of the manager and creator of the group
        members: [Number]                          // list of all the id of the members of the group
    });

    schema.statics.GET_ALL_GROUPS_OF_MANAGER = async function (manager) {
        return this.findAll({ manager: manager._id }).exec();
    }

    // get the manager of the group
    schema.methods.MANAGER = async function () {
        return Manager.findOne({ _id: manager }).exec();
    }
    // get the manager of the group
    schema.methods.MEMBERS = async function () {
        return User.findAll({ _id: { $in: members } }).exec();
    }

    db.model('ChatGroup', schema, 'Groups');
}