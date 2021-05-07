import React, { Fragment, useContext, useState } from 'react';
import { Modal, Button, Input, Space, message } from 'antd';
import { useCookieState, useDebounceFn } from "ahooks";
import { UserContext } from "../context/userContext"
import { store, userActions } from '../redux';


export const Login = () => {
    const [cookie, setCookie] = useCookieState('a04')
    const user_ = useContext(UserContext)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [message_, setMessage] = useState('')
    const [user, setUser] = useState({ name: '', pass: '' })
    const { run: setName } = useDebounceFn(({ target: { value: name } }) => {
        setUser({ name, pass: user.pass })
        console.log(user)
        // todo fetch hasName
        // setMessage('user not found')
    }, { wait: 200 })
    const { run: setPass } = useDebounceFn(({ target: { value: pass } }) => setUser({ name: user.name, pass }), { wait: 20 })

    const showModal = () => {
        // store.dispatch(userActions.update({ name: 'test', user: Math.random().toString(16).slice(-5) }))
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        setIsModalVisible(false)
        console.log(user)
        const _ = await Api.loginUser({ user: user.name, password: user.pass })
        console.log(_);
        if (_.success) {
            setCookie(_.data.token)
            store.dispatch(userActions.update(_.data.user))
        } else {
            message.info(_.message)
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Fragment>
            {/* <Button block={true} size='large' type="primary" onClick={showModal}>Login</Button> */}
            <Button block={true} size='large' type="primary" onClick={showModal}>登录</Button>
            <Modal title="Login" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Space direction="vertical" size="middle" align="center">
                    <Input allowClear placeholder="input username" autoFocus onInput={setName} />
                    {/* <Input allowClear placeholder="input username" autoFocus /> */}
                    <div className="message" style={{ color: 'red' }}>{message_}</div>
                    <Input.Password allowClear placeholder="input password" onInput={setPass} />
                </Space>
            </Modal>
        </Fragment>
    );
};
