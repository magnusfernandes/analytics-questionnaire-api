"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishEntry = void 0;
const errors_1 = require("../../errors");
const models_1 = require("../../models");
const publishEntry = (requestBody) => __awaiter(void 0, void 0, void 0, function* () {
    validateRequest(requestBody);
    const { id, version, data } = requestBody;
    let entry = yield models_1.Entry.findOne({
        where: {
            user: id,
        },
    });
    if (entry) {
        yield loadResponse(entry, data);
    }
    else {
        entry = yield models_1.Entry.create({
            user: id,
            version,
        });
        yield loadResponse(entry, data);
    }
    return Promise.resolve("Success");
});
exports.publishEntry = publishEntry;
function loadResponse(entry, data) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let response = yield models_1.Response.findOne({
                where: {
                    question: item.question,
                },
            });
            if (response) {
                response.response = item.response;
                response.time = item.time;
                yield response.save();
            }
            else {
                response = yield entry.createResponse({
                    question: item.question,
                    time: item.time,
                    response: item.response,
                });
            }
        }
    });
}
function validateRequest(request) {
    if (!request.version) {
        throw new errors_1.BadRequestError("Missing version parameter");
    }
    if (!request.id) {
        throw new errors_1.BadRequestError("Missing ID parameter");
    }
    if (request.data.length < 1) {
        throw new errors_1.BadRequestError("Missing data");
    }
}
