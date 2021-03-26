import * as crypto from "crypto";

export const getUuid = () => {
    return crypto.randomBytes(16).toString('hex')
}

export const cryptoPass = (pass: string) => {
    const salt = ':hi'
    const md5 = crypto.createHash('md5')
    return md5.update(pass + salt).digest('hex')
}