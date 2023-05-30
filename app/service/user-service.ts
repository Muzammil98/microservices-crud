import { APIGatewayProxyEventV2 } from "aws-lambda";
import { errorResponse, successResponse } from "../utility/response";
import { UserRepository } from "../repository/user-repository";
import { autoInjectable } from 'tsyringe'
import PwdUtil from '../utility/password'

@autoInjectable()
export class UserService {
     repository: UserRepository;

     constructor(repository: UserRepository) {
          this.repository = repository
     }

     async createUser(event: APIGatewayProxyEventV2) {
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

          return successResponse({ message: "User created successfuly", data })
     }
     async loginUser(event: APIGatewayProxyEventV2) {
          return successResponse({ message: "User logged in successfuly" })
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

