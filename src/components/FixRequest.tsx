import React, { FC, Fragment, useEffect, useState } from 'react';
import { Modal, Button, Input, Space, Form, FormItemProps, message } from 'antd';
import { useCookieState, useDebounceFn } from "ahooks";
import { store, userActions } from '../redux';
import { iState } from '../type&interface';

export const FixRequest: FC<{ reload: Function }> = ({ reload }) => {
    const [form] = Form.useForm()
    const [user, setUser] = useState(store.getState().user)
    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        const unsub = store.subscribe(() => {
            setUser(store.getState().user)
        })
        return unsub
    }, [])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const state: iState[] = [{ username: user?.name ?? '', time: new Date(), desc: '申请维修', bool: true }]
            const values = await form.validateFields()
            console.log(values);
            const _ = await Api.requestFix({ ...values, state })
            console.log(_);
            if (_.success) {
                message.info('申请成功')
                reload()
            } else message.info(_.message)
            setIsModalVisible(false)
        } catch (error) {
            message.info('网络错误，请重试')
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const { run: test } = useDebounceFn(async (v) => {
        await console.log('v', v)
        return v == 1 ? Promise.resolve() : Promise.reject()
    }, { wait: 200 })

    return (<Fragment>
        <Button style={{ margin: 16 }} type="primary" onClick={showModal}>申请报修</Button>
        {/* <Modal title="Request" visible={isModalVisible} onOk={handleOk} okText="request" onCancel={handleCancel}> */}
        <Modal title="Request" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} initialValues={{ user: user?.name }} >
                <Form.Item name="user" label="user">
                    <Input disabled />
                </Form.Item>
                <Form.Item name="fixture" label="fixture"
                    //  hasFeedback
                    // validateTrigger="onBlur"
                    rules={[
                        // { required: true, message: `Please input fixture's code!` },
                        {
                            // maybe create new issue
                            // search issue: validateTrigger, just chaos
                            // validateTrigger: 'onBlur',
                            validator: async (rule, value, callback) => {
                                // todo
                                // just debounce fetch, write outside
                                // return test(value)
                                console.log(value)
                                await new Promise((res) => { setTimeout(res, 200); })
                                // return value == 1 ? Promise.resolve() : Promise.reject(new Error(`Please input fixture's code!`))
                            }
                        }]}>
                    <Input placeholder="fixture's code" allowClear />
                </Form.Item>
                <Form.Item name="note" label="note" rules={[{ required: true, message: `Please input note` }]}>
                    <Input.TextArea allowClear showCount maxLength={50} />
                </Form.Item>
            </Form>
        </Modal>
    </Fragment>)
};
