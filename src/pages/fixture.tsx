import { Button, Form, Input, InputNumber, message, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { Uploader } from '../components';
import { iFixture } from '../type&interface';

export const Fixture: FC<any> = () => {
    const [data, setData] = useState<iFixture[]>([])
    const [fixture, setFixture] = useState<iFixture | {}>({})
    const [imgUrl, setImgUrl] = useState<string>('')
    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [load, setLoad] = useState(true)
    const [total, setTotal] = useState(0)

    const $ = useCallback(async (num, size) => {
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
    }, [])

    const showModal = (record: iFixture) => {
        setFixture(record)
        setImgUrl(record.pic)
        form.setFieldsValue({ ...record })
        setIsModalVisible(true)
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields()
            console.log(values);
            // todo update & img
            setIsModalVisible(false)
        } catch (error) {

        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    useEffect(() => {
        const _ = async () => { await $(1, 10) }
        _()
        // let data: any[] = []
        // for (let i = 0; i < 50; i++) {
        //     data.push({
        //         key: i,
        //         code: Math.random().toString(16).slice(-5),
        //         name: Math.random().toString(16).slice(-10),
        //         usedFor: Math.random().toString(16).slice(-10),
        //         useCount: (Math.random() * 10).toFixed(0) as unknown as number,
        //         PMPeriod: (Math.random() * 10).toFixed(0) as unknown as number,
        //         location: Math.random().toString(16).slice(-8),
        //         pic: Math.random().toString(16).slice(-10),
        //         state: Math.random().toString(16).slice(-5),
        //     });
        // }
        // setData(data)
    }, [$])

    return (<Fragment>
        <Table scroll={{ x: 1200 }} columns={[
            { title: '编码', width: 100, dataIndex: 'code', key: 'code', fixed: 'left', },
            { title: '图片', width: 100, dataIndex: 'pic', key: 'pic', fixed: 'left', },
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
        <Modal title="Update" destroyOnClose visible={isModalVisible} onOk={handleOk} okText="update" onCancel={handleCancel}>
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
                    <Uploader img={imgUrl} setImg={setImgUrl} />
                </Form.Item>
                <Form.Item name="state" label="state">
                    <Input disabled />
                </Form.Item>
            </Form>
        </Modal>
    </Fragment>)
}
