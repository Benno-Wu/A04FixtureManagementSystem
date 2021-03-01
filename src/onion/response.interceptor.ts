import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Response<T> {
    data: T
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>>{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map(data => ({
            success: true, data, message: null,
            status: HttpStatus.OK, timeStamp: Date.now(), path: context.switchToHttp().getRequest().url
        })))
    }
}