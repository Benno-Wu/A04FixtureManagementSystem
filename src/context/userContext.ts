import React from 'react'

class User implements iUser {
    name: string = '123'
    getName = () => (this.name)
}

interface iUser {
    name: string,
}
export default new User()
export const UserContext = React.createContext(new User())