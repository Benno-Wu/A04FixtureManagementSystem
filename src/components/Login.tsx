import React, { Fragment, useContext, useState } from 'react';
import { Modal, Button, Input, Space } from 'antd';
import { useCookieState, useDebounceFn } from "ahooks";
import { UserContext } from "../context/userContext"
import { store, userActions } from '../redux';


export const Login = () => {
    const [cookie, setCookie] = useCookieState('a04')
    const user_ = useContext(UserContext)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [user, setUser] = useState({ name: '', pass: '' })
    const { run: setName } = useDebounceFn(({ target: { value: name } }) => {
        setUser({ name, pass: user.pass })
        console.log(user)
        // todo fetch hasName
        setMessage('user not found')
    }, { wait: 200 })
    const { run: setPass } = useDebounceFn(({ target: { value: pass } }) => setUser({ name: user.name, pass }), { wait: 20 })

    const showModal = () => {
        store.dispatch(userActions.update({ name: 'test', user: Math.random().toString(16).slice(-5) }))
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false)
        console.log(user)
        // todo fetch login
        // setCookie('')
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Fragment>
            <Button block={true} size='large' type="primary" onClick={showModal}>Login</Button>
            <Modal title="Login" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Space direction="vertical" size="middle" align="center">
                    <Input allowClear placeholder="input username" autoFocus onInput={setName} />
                    <div className="message" style={{ color: 'red' }}>{message}</div>
                    <Input.Password allowClear placeholder="input password" onInput={setPass} />
                </Space>
            </Modal>
        </Fragment>
    );
};
