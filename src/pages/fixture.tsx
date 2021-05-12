import { Button, Form, Input, InputNumber, message, Modal, Table, Image } from 'antd';
import React, { FC, Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Uploader } from '../components';
import { imgPath } from '../constant';
import { iFixture } from '../type&interface';

export const Fixture: FC<any> = () => {
    const [data, setData] = useState<iFixture[]>([])
    const [fixture, setFixture] = useState<iFixture | {}>({})
    const [imgUrl, setImgUrl] = useState<string>('')
    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [load, setLoad] = useState(true)
    const [total, setTotal] = useState(0)
    const input = useRef<Input>(null)

    const search = async (v: string) => {
        if (!v.length) return $()
        setLoad(true)
        await $$(v)
    }

    const $$ = async (code: string, num = 1, size = 10) => {
        try {
            const { success, data, message: mess } = await Api.searchFixture({ size, num, code })
            if (success) {
                setData(data.fixture)
                setTotal(data.total)
            } else { message.info(mess) }
            setLoad(false)
        } catch (e) {
            message.info('网络异常，请稍后再试')
        }
    }

    const $ = async (num = 1, size = 10) => {
        if (input.current?.input.value) {
            return $$(input.current?.input.value, num, size)
        }
        try {
            const _ = await Api.pagedFixture({ num, size })
            console.log(_);
            if (_.success) {
                setData(_.data.list)
                setTotal(_.data.total)
            } else message.info(_.message)
            setLoad(false)
        } catch (error) {
            message.info('网络错误，请重试')
        }
    }

    const showModal = (record: iFixture) => {
        setFixture(record)
        setImgUrl(record.pic)
        form.setFieldsValue({ ...record })
        setIsModalVisible(true)
    };

    const handleOk = async () => {
        try {
            let values: any = await form.validateFields()
            values = { ...fixture, ...values, ...{ pic: imgUrl } }
            console.log(values);
            const _ = await Api.updateFixture(values)
            console.log(_);
            if (_.success) {
                message.info('修改成功')
                $()
            } else message.info(_.message)
            setIsModalVisible(false)
        } catch (error) {
            message.info('网络异常，请稍后再试')
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    useEffect(() => {
        const _ = async () => { await $(1, 10) }
        _()
    }, [])

    return (<Fragment>
        <Input.Search placeholder="input fixture's code" enterButton="Search" size="large" loading={load}
            allowClear style={{ padding: '20px 50px' }} onSearch={search} ref={input} />
        <Table scroll={{ x: 1200 }} rowKey="id" columns={[
            { title: '编码', width: 100, dataIndex: 'code', key: 'code', fixed: 'left', },
            {
                title: '图片', width: 100, dataIndex: 'pic', key: 'pic', fixed: 'left',
                render: (text, record, index) => <Image src={imgPath + text} />,
            },
            { title: '名称', dataIndex: 'name', key: 'name', },
            { title: '用途', dataIndex: 'usedFor', key: 'usedFor', },
            { title: '使用次数', dataIndex: 'useCount', key: 'useCount', },
            { title: '点检周期', dataIndex: 'PMPeriod', key: 'PMPeriod', },
            { title: '存放位置', dataIndex: 'location', key: 'location', },
            { title: '当前状态', dataIndex: 'state', key: 'state', fixed: 'right', width: 100, },
            {
                title: 'Operation', key: 'update', fixed: 'right', width: 100,
                render: (text, record, index) => {
                    return <Button onClick={() => showModal(record)}>update</Button>
                },
            },
        ]} dataSource={data} loading={load} pagination={{ total, onChange: $ }} />
        <Modal title="Update" destroyOnClose visible={isModalVisible} onOk={handleOk} okText="确认修改" onCancel={handleCancel}>
            <Form form={form} initialValues={{ ...fixture }} preserve={false} >
                <Form.Item name="code" label="code">
                    <Input disabled />
                </Form.Item>
                <Form.Item name="name" label="name" rules={[{ required: true, message: `Please input name` }]}>
                    <Input allowClear maxLength={25} />
                </Form.Item>
                <Form.Item name="usedFor" label="usedFor" rules={[{ required: true, message: `Please input usedFor` }]}>
                    <Input.TextArea allowClear showCount maxLength={50} />
                </Form.Item>
                <Form.Item name="useCount" label="useCount">
                    <Input disabled />
                </Form.Item>
                <Form.Item name="PMPeriod" label="PMPeriod" rules={[{ required: true, message: `Please input PMPeriod` }]}>
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item name="location" label="location" rules={[{ required: true, message: `Please input location` }]}>
                    <Input allowClear maxLength={25} />
                </Form.Item>
                <Form.Item name="pic" label="pic">
                    <Uploader img={imgPath + imgUrl} setImg={setImgUrl} />
                </Form.Item>
                <Form.Item name="state" label="state">
                    <Input disabled />
                </Form.Item>
            </Form>
        </Modal>
    </Fragment>)
}
