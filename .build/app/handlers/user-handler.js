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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.verify = exports.login = exports.signup = void 0;
const tsyringe_1 = require("tsyringe");
const user_service_1 = require("../service/user-service");
const response_1 = require("../utility/response");
const misc_1 = require("../utility/misc");
const core_1 = __importDefault(require("@middy/core"));
const http_json_body_parser_1 = __importDefault(require("@middy/http-json-body-parser"));
// ---------------------------------------------
const service = tsyringe_1.container.resolve(user_service_1.UserService);
exports.signup = (0, core_1.default)((event) => {
    return service.createUser(event);
}).use((0, http_json_body_parser_1.default)());
exports.login = (0, core_1.default)((event) => {
    return service.loginUser(event);
}).use((0, http_json_body_parser_1.default)());
const verify = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const httpMethod = event.requestContext.http.method;
    switch (httpMethod) {
        case misc_1.HTTP_METHODS.Get:
            return service.getVerificationToken(event);
            break;
        case misc_1.HTTP_METHODS.Post:
            return service.verifyUser(event);
            break;
        default:
            return (0, response_1.errorResponse)(404, "Method is not supported");
            break;
    }
});
exports.verify = verify;
const profile = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const httpMethod = event.requestContext.http.method;
    switch (httpMethod) {
        case misc_1.HTTP_METHODS.Get:
            return service.getProfile(event);
            break;
        case misc_1.HTTP_METHODS.Post:
            return service.createProfile(event);
            break;
        case misc_1.HTTP_METHODS.Put:
            return service.updateProfile(event);
            break;
        default:
            return (0, response_1.errorResponse)(404, "Method is not supported");
            break;
    }
});
exports.profile = profile;
//# sourceMappingURL=user-handler.js.map