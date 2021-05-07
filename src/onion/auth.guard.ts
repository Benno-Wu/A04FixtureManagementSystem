import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request } from "express";
import { RedisService } from "nestjs-redis";
import { Observable } from "rxjs";
import { User } from "src/user/entities/user.entity";
import { AllowList, authMap } from "src/utils";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly redisService: RedisService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest()
        const path = req.path.split('/').splice(1)
        if (path.length >= 2 && AllowList.includes(path[1])) {
            return true
        }
        let user: User
        const token = req.headers.authorization.slice(7)
        console.log(token);

        user = await new Promise((resolve, rej) => {
            this.redisService.getClient().get(token, (e, res) => {
                // if (res !== 'OK') {
                if (!res) {
                    rej(new HttpException("token-404", 400))
                }
                resolve(JSON.parse(res))
            })
        })

        if (path.length < 2 || !checking(user, path))
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

        // bug? pojo or new User()
        // it works
        req.body.token = user
        return true
    }
}

const checking = (user: User, path: string[]) => {
    const _ = user.authority[path[0]]
    const __ = authMap[path[0]][path[1]]
    console.log(_, __, _.toString(2) & __.toString(2), (_.toString(2) & __.toString(2)) == __.toString(2))
    return (_.toString(2) & __.toString(2)) == __.toString(2)
}
