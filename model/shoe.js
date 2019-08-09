const debug = require("debug")("mongo:model-shoe");
const mongo = require("mongoose");

module.exports = db => {
    let schema = new mongo.Schema({
        id: { type: String, required: true, unique: true, index: true },
        name: { type: String, required: true },
        description: { type: String },
        source: { type: String, required: true },
        price: { type: Number, required: true },
        color: [String]
    });

    schema.statics.CREATE = function (shoe) {
        return this.create(shoe);
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
            let cursor, shoe;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (shoe = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(shoe);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(shoe);
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

    db.model('Shoe', schema, 'Shoes');
}