import { Button, Form, Input, InputNumber, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { Uploader } from '../components';
import { iFixture } from '../type&interface';

export const Fixture: FC<any> = () => {
    const [data, setData] = useState<iFixture[]>([])
    const [fixture, setFixture] = useState<iFixture | {}>({})
    const [imgUrl, setImgUrl] = useState<string>('')
    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false)

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
        // todo fetch
        let data: any[] = []
        for (let i = 0; i < 50; i++) {
            data.push({
                key: i,
                code: Math.random().toString(16).slice(-5),
                name: Math.random().toString(16).slice(-10),
                usedFor: Math.random().toString(16).slice(-10),
                useCount: (Math.random() * 10).toFixed(0) as unknown as number,
                PMPeriod: (Math.random() * 10).toFixed(0) as unknown as number,
                location: Math.random().toString(16).slice(-8),
                pic: Math.random().toString(16).slice(-10),
                state: Math.random().toString(16).slice(-5),
            });
        }
        setData(data)
    }, [])

    return (<Fragment>
        <Table scroll={{ x: 1200 }} columns={[
            { title: 'Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left', },
            { title: 'Pic', width: 100, dataIndex: 'pic', key: 'pic', fixed: 'left', },
            { title: 'UsedFor', dataIndex: 'usedFor', key: 'usedFor', },
            { title: 'UseCount', dataIndex: 'useCount', key: 'useCount', },
            { title: 'PMPeriod', dataIndex: 'PMPeriod', key: 'PMPeriod', },
            { title: 'Location', dataIndex: 'location', key: 'location', },
            { title: 'State', dataIndex: 'state', key: 'state', fixed: 'right', width: 100, },
            {
                title: 'Operation', key: 'update', fixed: 'right', width: 100,
                render: (text, record, index) => {
                    return <Button onClick={() => showModal(record)}>update</Button>
                },
            },
        ]} dataSource={data}
            pagination={{
                total: data.length,
                onChange: () => { },
            }} />
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
