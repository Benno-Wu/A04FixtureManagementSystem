import React, { FC, useCallback, useEffect, useState } from "react";
import { message, Table } from 'antd';
import { iPurchase } from "../type&interface";

const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <a>Delete</a>,
    },
];

const data = [
    {
        key: 1,
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 2,
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
        key: 3,
        name: 'Not Expandable',
        age: 29,
        address: 'Jiangsu No. 1 Lake Park',
        description: 'This not expandable',
    },
    {
        key: 4,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
];

export const Purchase: FC<any> = () => {
    const [data, setData] = useState<iPurchase[]>([])
    const [load, setLoad] = useState(true)
    const [total, setTotal] = useState(0)
    const $ = useCallback(async (num, size) => {
        try {
            const _ = await Api.pagedPurchase({ num, size })
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

    useEffect(() => {
        const _ = async () => { await $(1, 10) }
        _()
    }, [$])
    return (<Table
        columns={columns}
        expandable={{
            expandedRowRender: record => <p style={{ margin: 0 }}>{record}</p>,
            rowExpandable: record => record.billNo !== 'Not Expandable',
        }}
        dataSource={data} loading={load} pagination={{ total, onChange: $ }}
    />)
}