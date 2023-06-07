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
exports.SendVerificationCode = exports.GenerateAccessCode = void 0;
const twilio_1 = __importDefault(require("twilio"));
const accountSid = "AC7d58c05913b6889dbfa24aef44f7611a";
const authToken = "022865779aa9a1409b2fccf292f0cf71";
// const verifySid = "VAc3f0dd67ba8d23daf5b5d63a2c4b95f4";
const client = (0, twilio_1.default)(accountSid, authToken);
// client.verify.v2
//   .services(verifySid)
//   .verifications.create({ to: "+923408587578", channel: "sms" })
//   .then((verification) => console.log(verification.status))
//   .then(() => {
//     const readline = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     readline.question("Please enter the OTP:", (otpCode) => {
//       client.verify.v2
//         .services(verifySid)
//         .verificationChecks.create({ to: "+923408587578", code: otpCode })
//         .then((verification_check) => console.log(verification_check.status))
//         .then(() => readline.close());
//     });
//   });
function GenerateAccessCode() {
    const code = Math.floor(10000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
    return { code, expiry };
}
exports.GenerateAccessCode = GenerateAccessCode;
function SendVerificationCode(code, phone) {
    return __awaiter(this, void 0, void 0, function* () {
        client.messages
            .create({ body: `Your verification code is ${code} and it will expire in 30 minutes`, from: '+923408587578', to: phone })
            // .create({ body: `Hi there ${code}`, from: '+15017122661', to: '+15558675310' })
            .then(message => console.log(message.sid)).catch(err => console.log(err));
    });
}
exports.SendVerificationCode = SendVerificationCode;
//# sourceMappingURL=notification.js.map