"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseFactory = exports.ResponseModel = void 0;
const sequelize_1 = require("sequelize");
class ResponseModel extends sequelize_1.Model {
}
exports.ResponseModel = ResponseModel;
function ResponseFactory(config) {
    return config.define("responses", {
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        entryId: {
            type: sequelize_1.DataTypes.BIGINT,
            references: {
                model: "entries",
                key: "id",
            },
        },
        question: {
            type: sequelize_1.DataTypes.STRING,
        },
        time: {
            type: sequelize_1.DataTypes.FLOAT,
        },
        response: {
            type: sequelize_1.DataTypes.JSONB,
        },
    });
}
exports.ResponseFactory = ResponseFactory;
