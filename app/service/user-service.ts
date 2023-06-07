import { APIGatewayProxyEventV2 } from "aws-lambda";
import { errorResponse, successResponse } from "../utility/response";
import { UserRepository } from "../repository/user-repository";
import { autoInjectable } from 'tsyringe'
import PwdUtil from '../utility/password'
import { GenerateAccessCode, SendVerificationCode } from "../utility/notification";

@autoInjectable()
export class UserService {
     repository: UserRepository;

     constructor(repository: UserRepository) {
          this.repository = repository
     }

     async createUser(event: APIGatewayProxyEventV2) {
          try {
               const body = event.body

               // @ts-ignore
               const email = body.email ?? "", phone = body.phone ?? "", user_type = body.user_type ?? "USER", password = body.password ?? ""
               if (!body || !email || !phone || !password) return errorResponse(400, "Values are missing")


               const hash = await PwdUtil.getHash(password)
               const data = await this.repository.createAccount({
                    email,
                    phone,
                    user_type,
                    hash
               })

               return successResponse(data)
          } catch (error) {
               console.log(error)
               return errorResponse(500, error)
          }
     }
     async loginUser(event: APIGatewayProxyEventV2) {
          try {
               // @ts-ignore
               const body: { email: string, password: string } = event.body

               const email = body.email ?? "", password = body.password ?? ""

               if (!email || !password) return errorResponse(400, "Values are missing")

               const _user = await this.repository.findAccount(email)

               // check and validate user passowrd
               const isValid = await PwdUtil.compare(password, _user.hash)

               if (!isValid) return errorResponse(400, "Invalid email or password")

               // @ts-ignore
               delete _user.hash

               const token = await PwdUtil.getToken(_user)

               return successResponse({ token })
          } catch (error) {
               console.log(error)
               return errorResponse(500, error)
          }
          return successResponse({ message: "User logged in successfuly" })
     }
     async getVerificationToken(event: APIGatewayProxyEventV2) {
          const token = event.headers.authorization
          if (!token) return errorResponse(401, "Unauthorized")

          const { code, expiry } = GenerateAccessCode()
          await SendVerificationCode(code, "+923408587578")

          return successResponse({ message: "OTP sent successfully" })
     }
     async verifyUser(event: APIGatewayProxyEventV2) {
          return successResponse({ message: "User verified successfuly" })
     }
     async createProfile(event: APIGatewayProxyEventV2) {
          return successResponse({ message: "Profile created successfuly" })
     }
     async updateProfile(event: APIGatewayProxyEventV2) {
          return successResponse({ message: "Profile updated successfuly" })
     }
     async getProfile(event: APIGatewayProxyEventV2) {
          return successResponse({ message: "Profile recieved successfuly" })
     }
}

