"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (message, success = false, data = null) => {
    return {
        success,
        message,
        data,
    };
};
exports.sendResponse = sendResponse;
//# sourceMappingURL=helper.js.map