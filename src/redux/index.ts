import { combineReducers, createStore } from "redux"
import { userReducer as user } from "./user"
export { userActions } from './user'

export const store = createStore(combineReducers({ user }),
    {
        user: {
            name: '未登录',
            user: 'unknown',
        }
    })
