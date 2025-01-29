
class apiResponse {
    constructor(statusCode,data,message="api running successfully"){
        this.statusCode=statusCode
        this.data= data
        this.message=message
        this.success= true
    }
}

export {apiResponse}