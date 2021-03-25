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
import { store } from './redux';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
export const history = createHashHistory()

function App() {
  const [cookie, setCookie] = useCookieState('ao4', { expires: 3600 * 24 * 7 })
  const [collapsed, setCollapsed] = useState(false)
  const [user, setUser] = useState(store.getState().user)
  const onCollapse = (collapsed: boolean): void => setCollapsed(collapsed)

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setUser(store.getState().user)
    })
    return unsub
  }, [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" >img</div>
        <Menu theme="dark" mode="inline">
          {Object.entries(Pages).map(([name, component]) => (
            <Menu.Item key={name} title={name} icon={<WindowsFilled />} onClick={() => {
              history.push(name)
            }} >{name}</Menu.Item>
          ))}
        </Menu>
        <div style={{ position: 'absolute', bottom: '48px', width: '100%', display: cookie ? 'none' : 'block' }}>
          <Login />
        </div>
      </Sider>
      <Layout style={{ height: '100vh', overflow: 'auto' }}>
        {/* 优化update范围 */}
        <Header style={{ padding: 0, backgroundColor: '#314F6C' }} >
          {JSON.stringify(user)}
        </Header>
        <Content style={{ margin: '0 16px', overflow: 'auto' }}>
          <HashRouter>
            <Switch>
              {RouterArray.map(({ path, ...other }) => <Route key={path} path={path} {...other} />)}
            </Switch>
          </HashRouter>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout >)
}

export default App;
