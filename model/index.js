const debug = require("debug")("mongo:model");
const mongo = require("mongoose");
autoIncrement = require('mongoose-auto-increment');
let db = mongo.createConnection();
autoIncrement.initialize(db);
(async () => {
    try {
        await db.openUri('mongodb://localhost/projectdb');
    } catch (err) {
        debug("Error connecting to DB: " + err);
    }
})();
debug('Pending DB connection');
require("./user")(db);
require("./shoe")(db);
require("./order")(db);
require("./customer")(db);
require("./manager")(db);
require("./employee")(db);
require('./item')(db);
module.exports = model => db.model(model);	
