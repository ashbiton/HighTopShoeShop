const debug = require("debug")("mongo:model-item");
const mongo = require("mongoose");

module.exports = db => {
    let sizeSchema = new mongo.Schema({
        size: { type: Number, default: 6, min: 4, max: 11 }, // american sizes, includes halfs
        quantity: { type: Number, default: 10 }
    });
    let schema = new mongo.Schema({
        shoe: { type: mongo.Schema.Types.ObjectId, required: true },
        quantity: [sizeSchema],
        active: { type: Boolean, required: true, default: true },
        categories: [String],
        review: [Number], // length = 5 where index i is i stars and the value is how many people voted it
    });

    schema.statics.CREATE = function (item) {
        return this.create(item);
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
            let cursor, item;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (item = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(item);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(item);
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

    db.model('Item', schema, 'Stock');
}