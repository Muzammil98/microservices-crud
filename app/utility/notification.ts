import twilio from 'twilio'

const accountSid = "AC7d58c05913b6889dbfa24aef44f7611a"
const authToken = "022865779aa9a1409b2fccf292f0cf71"
// const verifySid = "VAc3f0dd67ba8d23daf5b5d63a2c4b95f4";

const client = twilio(accountSid, authToken)
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

export function GenerateAccessCode(): { code: number, expiry: Date } {
    const code = Math.floor(10000 + Math.random() * 900000)
    let expiry = new Date()
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000)

    return { code, expiry }
}

export async function SendVerificationCode(code: number, phone: string) {

    client.messages
        .create({ body: `Your verification code is ${code} and it will expire in 30 minutes`, from: '+923408587578', to: phone })
        // .create({ body: `Hi there ${code}`, from: '+15017122661', to: '+15558675310' })
        .then(message => console.log(message.sid)).catch(err => console.log(err))

}