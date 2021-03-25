import React, { FC } from "react"
// import { Fix, Fixture, Purchase, Scheduling, Useless, User } from "../pages"
import * as Pages from "../pages"

export const RouterArray: iRouter[] = Object.entries(Pages).map(([name, component]) => ({
    path: `/${name}`,
    exact: true,
    component,
}))

interface iRouter {
    path: string,
    // component: FC | Component<any, any>,
    // component: FC | any,
    component: FC<any>,
    // component: React.FunctionComponent,
    // component: React.ReactNode | JSX.Element,
    exact?: boolean,
}