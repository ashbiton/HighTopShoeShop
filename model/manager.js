const debug = require("debug")("mongo:model-manager");
const mongo = require("mongoose");
const { gender , experience } = require('../resources');
const options = { dicriminatorKey: 'position' };

module.exports = db => {
    const UserModel = db.model("User");
    let schema = new mongo.Schema({
        gender: { type: String, enum: gender.values, default: gender.default },
        salary: { type: Number, required: true, default: 70.00 },
        phone: String,
        location: String,
        precent: { type: Number, default: 100 },
        experience: { Type: String, enum: experience.values, default: experience.default },
        active: { type: Boolean, default: true },
        hiredAt: { type: Date, default: Date.now() },
    });

    schema.statics.CREATE = function (manager) {
        manager.position = "manager";
        return this.create(manager);
    }

    schema.statics.REQUEST = async function () {
        // no arguments - bring all at once
        const args = Array.from(arguments); // [...arguments]
        if (args.length === 0) {
            debug("request: no arguments - bring all at once");
            return this.find({}).exec();
        }

        // perhaps last argument is a callback for every single document
        let callback = arguments[arguments.length - 1];
        if (callback instanceof Function) {
            let asynch = callback.constructor.name === 'AsyncFunction';
            debug(`request: with ${asynch ? 'async' : 'sync'} callback`);
            args.pop();
            let cursor, manager;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (manager = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(manager);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(manager);
                    }
                }
            } catch (err) { throw err; }
            return;
        }

        // request by id as a hexadecimal string
        if (args.length === 1 && typeof args[0] === "string") {
            debug("request: by ID");
            return this.findById(args[0]).exec();
        }

        // There is no callback - bring requested at once
        debug(`request: without callback: ${JSON.stringify(args)}`);
        return this.find(...args).exec();
    };

    UserModel.discriminator('Manager', schema, options);
}