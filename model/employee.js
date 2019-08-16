const debug = require("debug")("mongo:model-employee");
const mongo = require("mongoose");
const { gender, salary, precent, experience, review } = require('../project-client/src/resources')
const options = { dicriminatorKey: 'position' };

module.exports = db => {
    const UserModel = db.model("User");
    let schema = new mongo.Schema({
        gender: { type: String, enum: gender.values, default: gender.default },
        salary: { type: Number, required: true, default: salary.default, min: salary.min },
        phone: { type: String, required: true },
        precent: { type: Number, default: precent.default, min: precent.min, max: precent.max },
        experience: { type: String, enum: experience.values, default: experience.default },
        hiredAt: { type: Date, default: Date.now() },
        review: { type: String, enum: review.values, default: review.default },
    });

    schema.statics.CREATE = function (employee) {
        employee.position = "employee";
        return this.create(employee);
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
            let cursor, employee;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (employee = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(employee);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(employee);
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

    UserModel.discriminator('Employee', schema, options);
}