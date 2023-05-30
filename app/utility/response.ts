
export const formatResponse = (statusCode: number, message: string, data: any) => {
    if (!data)
        return {
            statusCode,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                message,
            })
        }

    return {
        statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            message,
            data
        })
    }
}

export const errorResponse = (code = 1000, error: any) => {
    if (Array.isArray(error)) {
        const errObj = error[0].constraints;
        const errMsg = errObj[Object.keys(errObj)[0]] || "Error occurred"
        return formatResponse(code, errMsg, false)
    }
    return formatResponse(code, `${error}`, false)
}

export const successResponse = (data: any) => {
    return formatResponse(200, "success", data)
}
