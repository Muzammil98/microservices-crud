import { container } from "tsyringe";
import { UserService } from "../service/user-service";
import { errorResponse, successResponse } from "../utility/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { HTTP_METHODS } from '../utility/misc'
import middy from '@middy/core'
import jsonBodyParser from "@middy/http-json-body-parser";

// ---------------------------------------------

const service = container.resolve(UserService);

export const signup = middy(
    (event: APIGatewayProxyEventV2) => {

        return service.createUser(event)
    }
).use(jsonBodyParser())

export const login = middy(
    (event: APIGatewayProxyEventV2) => {

        return service.loginUser(event)
    }
).use(jsonBodyParser())


export const verify = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method

    switch (httpMethod) {
        case HTTP_METHODS.Get:
            return service.getVerificationToken(event)
            break;
        case HTTP_METHODS.Post:
            return service.verifyUser(event)
            break;

        default:
            return errorResponse(404, "Method is not supported")
            break;
    }
}

export const profile = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method

    switch (httpMethod) {
        case HTTP_METHODS.Get:
            return service.getProfile(event)
            break;
        case HTTP_METHODS.Post:
            return service.createProfile(event)
            break;
        case HTTP_METHODS.Put:
            return service.updateProfile(event)
            break;
        default:
            return errorResponse(404, "Method is not supported")
            break;
    }
}