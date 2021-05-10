import React, { FC, Fragment, useEffect, useState } from 'react';
import { Modal, Button, Input, Space, Form, FormItemProps, message, Radio } from 'antd';
import { useCookieState, useDebounceFn } from "ahooks";
import { store, userActions } from '../redux';
import { iState } from '../type&interface';

export const SchedulingRequest: FC<{ reload: Function }> = ({ reload }) => {
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
            const values = await form.validateFields()
            console.log(values);
            const state: iState[] = [{
                username: user?.name ?? '', time: new Date(),
                desc: '申请' + (values.bool ? '出库' : '入库'), bool: values.bool
            }]
            const _ = await Api.addScheduling({ ...values, state })
            console.log(_);
            if (_.success) {
                message.info((values.bool ? '出库' : '入库') + '成功')
                reload()
            } else message.info(_.message)
            setIsModalVisible(false)
        } catch (error) {
            message.info('网络错误，请重试')
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    return <Fragment>
        <Button style={{ margin: 16 }} type="primary" onClick={showModal}>申请出入库</Button>
        <Modal title="Request" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} initialValues={{ user: user?.name, bool: false }} >
                <Form.Item name="user" label="用户">
                    <Input disabled />
                </Form.Item>
                <Form.Item name="fixture" label="工夹具编号">
                    <Input placeholder="fixture's code" allowClear />
                </Form.Item>
                <Form.Item name="bool" label="出/入库">
                    <Radio.Group>
                        <Radio value={false}>入库</Radio>
                        <Radio value={true}>出库</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    </Fragment>
};
