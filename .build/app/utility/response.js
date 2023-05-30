"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = exports.errorResponse = exports.formatResponse = void 0;
const formatResponse = (statusCode, message, data) => {
    if (!data)
        return {
            statusCode,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message,
            })
        };
    return {
        statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            message,
            data
        })
    };
};
exports.formatResponse = formatResponse;
const errorResponse = (code = 1000, error) => {
    if (Array.isArray(error)) {
        const errObj = error[0].constraints;
        const errMsg = errObj[Object.keys(errObj)[0]] || "Error occurred";
        return (0, exports.formatResponse)(code, errMsg, false);
    }
    return (0, exports.formatResponse)(code, `${error}`, false);
};
exports.errorResponse = errorResponse;
const successResponse = (data) => {
    return (0, exports.formatResponse)(200, "success", data);
};
exports.successResponse = successResponse;
//# sourceMappingURL=response.js.map