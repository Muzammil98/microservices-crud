"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.UserService = void 0;
const response_1 = require("../utility/response");
const user_repository_1 = require("../repository/user-repository");
const tsyringe_1 = require("tsyringe");
const password_1 = __importDefault(require("../utility/password"));
const notification_1 = require("../utility/notification");
let UserService = class UserService {
    constructor(repository) {
        this.repository = repository;
    }
    createUser(event) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = event.body;
                // @ts-ignore
                const email = (_a = body.email) !== null && _a !== void 0 ? _a : "", phone = (_b = body.phone) !== null && _b !== void 0 ? _b : "", user_type = (_c = body.user_type) !== null && _c !== void 0 ? _c : "USER", password = (_d = body.password) !== null && _d !== void 0 ? _d : "";
                if (!body || !email || !phone || !password)
                    return (0, response_1.errorResponse)(400, "Values are missing");
                const hash = yield password_1.default.getHash(password);
                const data = yield this.repository.createAccount({
                    email,
                    phone,
                    user_type,
                    hash
                });
                return (0, response_1.successResponse)(data);
            }
            catch (error) {
                console.log(error);
                return (0, response_1.errorResponse)(500, error);
            }
        });
    }
    loginUser(event) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const body = event.body;
                const email = (_a = body.email) !== null && _a !== void 0 ? _a : "", password = (_b = body.password) !== null && _b !== void 0 ? _b : "";
                if (!email || !password)
                    return (0, response_1.errorResponse)(400, "Values are missing");
                const _user = yield this.repository.findAccount(email);
                // check and validate user passowrd
                const isValid = yield password_1.default.compare(password, _user.hash);
                if (!isValid)
                    return (0, response_1.errorResponse)(400, "Invalid email or password");
                // @ts-ignore
                delete _user.hash;
                const token = yield password_1.default.getToken(_user);
                return (0, response_1.successResponse)({ token });
            }
            catch (error) {
                console.log(error);
                return (0, response_1.errorResponse)(500, error);
            }
            return (0, response_1.successResponse)({ message: "User logged in successfuly" });
        });
    }
    getVerificationToken(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = event.headers.authorization;
            if (!token)
                return (0, response_1.errorResponse)(401, "Unauthorized");
            const { code, expiry } = (0, notification_1.GenerateAccessCode)();
            yield (0, notification_1.SendVerificationCode)(code, "+923408587578");
            return (0, response_1.successResponse)({ message: "OTP sent successfully" });
        });
    }
    verifyUser(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, response_1.successResponse)({ message: "User verified successfuly" });
        });
    }
    createProfile(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, response_1.successResponse)({ message: "Profile created successfuly" });
        });
    }
    updateProfile(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, response_1.successResponse)({ message: "Profile updated successfuly" });
        });
    }
    getProfile(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, response_1.successResponse)({ message: "Profile recieved successfuly" });
        });
    }
};
UserService = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user-service.js.map