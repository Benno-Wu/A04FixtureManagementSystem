import { combineReducers, createStore } from "redux"
import { userReducer as user } from "./user"
export { userActions } from './user'

export const store = createStore(combineReducers({ user }),
    {
        user: {
            born: new Date(),
            name: 'unknown',
            user: 'unknown',
        }
    })
