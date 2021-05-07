import React, { useContext, useEffect, useState } from 'react'
import './App.css'
import { HashRouter, Route, Switch } from "react-router-dom"
import { createHashHistory } from "history";
import { useCookieState } from 'ahooks';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { WindowsFilled } from '@ant-design/icons';
import * as Pages from "./pages"
import { RouterArray } from "./router"
import { Login } from "./components";
import { store, userActions } from './redux';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
export const history = createHashHistory()

function App() {
  const [cookie, setCookie] = useCookieState('a04', { expires: 3600 * 24 * 7 })
  const [collapsed, setCollapsed] = useState(false)
  const [user, setUser] = useState(store.getState().user)
  const onCollapse = (collapsed: boolean): void => setCollapsed(collapsed)

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setUser(store.getState().user)
    })
    console.log(cookie);
    const _ = async () => {
      const _: any = await Api.selfUser()
      setUser(_.data)
      store.dispatch(userActions.update(_.data))
    }
    if (cookie) _()
    return unsub
  }, [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" >工夹具管理系统</div>
        <Menu theme="dark" mode="inline">
          {Object.entries(Pages).map(([name, component]) => (
            <Menu.Item key={name} icon={<WindowsFilled />}
              title={{ Fixture: '工夹具', Fix: '报修', Purchase: '采购', Scheduling: '出入库', Useless: '报废', User: '用户相关' }[name]}
              onClick={() => { history.push(name) }} >{{ Fixture: '工夹具', Fix: '报修', Purchase: '采购', Scheduling: '出入库', Useless: '报废', User: '用户相关' }[name]}</Menu.Item>
          ))}
        </Menu>
        {/* <div style={{ position: 'absolute', bottom: '48px', width: '100%', display: cookie ? 'none' : 'block' }}> */}
        <div style={{ position: 'absolute', bottom: '48px', width: '100%', display: 'block' }}>
          <Login />
        </div>
      </Sider>
      <Layout style={{ height: '100vh', overflow: 'auto' }}>
        {/* 优化update范围 */}
        <Header style={{ padding: 0, backgroundColor: '#314F6C' }} >
          <span className="user">用户名：{user?.name}&nbsp;&nbsp;&nbsp;&nbsp;用户编码：{user?.user}</span>
        </Header>
        <Content style={{ margin: '0 16px', overflow: 'auto' }}>
          <HashRouter>
            <Switch>
              {RouterArray.map(({ path, ...other }) => <Route key={path} path={path} {...other} />)}
            </Switch>
          </HashRouter>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
      </Layout>
    </Layout >)
}

export default App;
