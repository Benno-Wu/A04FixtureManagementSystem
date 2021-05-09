import React, { Fragment, useEffect, useRef, useState, FC } from 'react';
import { Modal, Button, Input, Space, Form, FormItemProps, message, InputNumber } from 'antd';
import { useCookieState, useDebounceFn } from "ahooks";
import { store, userActions } from '../redux';
import { iFixture, iState } from '../type&interface';
import { MinusCircleOutlined, PayCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Uploader } from '.';

export const PurchaseRequest: FC<{ reload: Function }> = ({ reload }) => {
    const [form] = Form.useForm()
    const [user, setUser] = useState(store.getState().user)
    const [isModalVisible, setIsModalVisible] = useState(false)
    // const [imgUrl, setImgUrl] = useState<string[]>([])
    const { current: imgUrl } = useRef<string[]>([])

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
            const state: iState[] = [{ username: user?.name ?? '', time: new Date(), desc: '申请采购', bool: true }]
            const values = await form.validateFields()
            values.fixture.forEach((v: any, i: number) => {
                v.useCount = 0
                v.pic = imgUrl[i]
                v.state = state
            })
            console.log(values);
            const _ = await Api.requestPurchase({ ...values, state })
            console.log(_);
            if (_.success) {
                message.info('申请成功')
                reload()
            } else message.info(_.message)
            closeModal()
        } catch (error) {
            message.info('网络错误，请重试')
        }
    };

    const handleCancel = () => {
        closeModal()
    };

    const closeModal = () => {
        imgUrl.splice(0, imgUrl.length)
        setIsModalVisible(false)
    }

    return (<Fragment>
        <Button style={{ margin: 16 }} type="primary" onClick={showModal}>申请采购</Button>
        {/* <Modal title="Request" visible={isModalVisible} onOk={handleOk} okText="request" onCancel={handleCancel}> */}
        <Modal title="Request" destroyOnClose visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} initialValues={{ user: user?.name, fields: [{}] }} preserve={false} >
                <Form.Item name="user" label="user">
                    <Input disabled />
                </Form.Item>
                <Form.Item name="price" label="price">
                    <Input allowClear type={'number'} addonAfter={<PayCircleOutlined />} />
                </Form.Item>
                <Form.Item name="billNo" label="billNo">
                    <Input allowClear />
                </Form.Item>
                <Form.List name="fixture">
                    {(fields, { add, remove }) => (
                        <>{fields.map(({ key, name, fieldKey, ...restField }, index) => (
                            <Space key={key} direction="vertical">
                                {/* <Form.Item>
                                        {key + ' ' + name + ' ' + fieldKey + ' ' + restField}
                                    </Form.Item> */}
                                <Form.Item label="编码" rules={[{ required: true, message: `Please input code` }]}
                                    {...restField}
                                    name={[name, 'code']}
                                    fieldKey={[fieldKey, 'code']}>
                                    <Input allowClear />
                                </Form.Item>
                                <Form.Item label="名称" rules={[{ required: true, message: `Please input name` }]}
                                    {...restField}
                                    name={[name, 'name']}
                                    fieldKey={[fieldKey, 'name']}>
                                    <Input allowClear maxLength={25} />
                                </Form.Item>
                                <Form.Item label="用途" rules={[{ required: true, message: `Please input usedFor` }]}
                                    {...restField}
                                    name={[name, 'usedFor']}
                                    fieldKey={[fieldKey, 'usedFor']}>
                                    <Input.TextArea allowClear showCount maxLength={50} />
                                </Form.Item>
                                <Form.Item label="点检周期" rules={[{ required: true, message: `Please input PMPeriod` }]}
                                    {...restField}
                                    name={[name, 'PMPeriod']}
                                    fieldKey={[fieldKey, 'PMPeriod']}>
                                    <InputNumber min={0} />
                                </Form.Item>
                                <Form.Item label="位置" rules={[{ required: true, message: `Please input location` }]}
                                    {...restField}
                                    name={[name, 'location']}
                                    fieldKey={[fieldKey, 'location']}>
                                    <Input allowClear maxLength={25} />
                                </Form.Item>
                                <Form.Item label="图片">
                                    <Uploader img={imgUrl[index]} setImg={(url: string) => {
                                        imgUrl.splice(index, 1, url)
                                    }} />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => {
                                    remove(name)
                                    imgUrl.splice(index, 1, '')
                                }} />
                            </Space>
                        ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => {
                                    add()
                                    imgUrl.push('')
                                }} block icon={<PlusOutlined />}>添加工夹具</Button>
                            </Form.Item>
                        </>)}
                </Form.List>
            </Form>
        </Modal>
    </Fragment>)
};
