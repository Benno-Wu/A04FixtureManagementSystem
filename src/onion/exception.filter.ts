import { ArgumentsHost, Catch, HttpException, HttpStatus } from "@nestjs/common";
import { codeMap } from "src/utils";

@Catch()
export class ExceptionFilter implements ExceptionFilter {
    catch(e: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const res = ctx.getResponse()
        const req = ctx.getRequest()
        const status = e instanceof HttpException ?
            e.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
        res.status(status).json({
            success: false, data: null, code: e.message, message: codeMap[e.message],
            status, timeStamp: Date.now(), path: req.url
        })
    }
}
