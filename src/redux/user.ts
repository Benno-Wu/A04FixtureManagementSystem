import { Action, Reducer } from "redux";
import { iAction, iUser } from "../type&interface";

const userAction = {
    update: Symbol('user-upate')
}

export const userActions: iAction<iUser> = {
    update: user => ({ payload: user, type: userAction.update })
}

export const userReducer: Reducer<Partial<iUser> | undefined, { payload: Partial<iUser> } & Action> = (state = {}, action) => {
    switch (action.type) {
        case userAction.update:
            return { ...state, ...action.payload }
        default:
            return state
    }
}