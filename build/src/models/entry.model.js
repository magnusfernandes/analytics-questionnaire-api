"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryFactory = exports.EntryModel = void 0;
const sequelize_1 = require("sequelize");
class EntryModel extends sequelize_1.Model {
}
exports.EntryModel = EntryModel;
function EntryFactory(config) {
    return config.define("entries", {
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        user: {
            type: sequelize_1.DataTypes.UUID,
            unique: true,
        },
        version: {
            type: sequelize_1.DataTypes.STRING,
        },
    });
}
exports.EntryFactory = EntryFactory;
