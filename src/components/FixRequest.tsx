import React, { Fragment, useState } from 'react';
import { Modal, Button, Input, Space, Form, FormItemProps } from 'antd';
import { useCookieState, useDebounceFn } from "ahooks";
import { store, userActions } from '../redux';

export const FixRequest = () => {
    const [form] = Form.useForm()
    const user = store.getState().user
    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields()
            console.log(values);
            setIsModalVisible(false)
        } catch (error) {

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
        <Button style={{ margin: 16 }} type="primary" onClick={showModal}>request</Button>
        <Modal title="Request" visible={isModalVisible} onOk={handleOk} okText="request" onCancel={handleCancel}>
            <Form form={form} initialValues={{ user }} >
                <Form.Item name="user" label="user">
                    <Input disabled />
                </Form.Item>
                <Form.Item name="fixture" label="fixture" hasFeedback
                    validateTrigger="onBlur"
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
                                return value == 1 ? Promise.resolve() : Promise.reject(new Error(`Please input fixture's code!`))
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
