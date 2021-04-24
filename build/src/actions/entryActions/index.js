"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryActions = void 0;
const publish_entry_action_1 = require("./publish-entry.action");
const fetch_submission_action_1 = require("./fetch-submission.action");
const EntryActions = {
    publishEntry: publish_entry_action_1.publishEntry,
    fetchSubmission: fetch_submission_action_1.fetchSubmission,
};
exports.EntryActions = EntryActions;
