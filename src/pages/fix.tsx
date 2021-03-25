// @ts-nocheck

import React, { FC, Fragment, useEffect, useState } from "react";
import { Popconfirm, Steps, Table, Button } from 'antd';
import { iFix } from "../type&interface";
import { ColumnsType } from "antd/es/table";
import { PopCheck, FixRequest } from "../components";
const { Step } = Steps

export const Fix: FC<any> = () => {
    const [data, setData] = useState<Partial<iFix>[]>([])

    useEffect(() => {
        // todo fetch loading
        setData([
            {
                key: 1,
                id: 1,
                state: [
                    { username: 1, time: 2, desc: 'test0', bool: true },
                    { username: 1, time: 2, desc: 'test1', bool: undefined },
                    { username: 1, time: 2, desc: 'test2', bool: true },],
                user: { id: 1, },
                fixture: 'New York No. 1 Lake Park',
                description: 'My id is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
            },
            {
                key: 2,
                id: 2,
                state: [
                    { username: 'undefined', time: 2, desc: 'test3', bool: true },
                    { username: 'undefined', time: 2, desc: 'test4', bool: false },
                    { username: 'undefined', time: 2, desc: 'test5', bool: true },],
                user: 'aa',
                fixture: 'London No. 1 Lake Park',
                description: 'My id is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
            },
        ])
    }, [])
    return (<Fragment>
        <FixRequest />
        <Table
            columns={[
                { title: 'Id', dataIndex: 'id', key: 'id' },
                { title: 'User', dataIndex: 'user', key: 'user' },
                { title: 'Fixture', dataIndex: 'fixture', key: 'fixture' },
                {
                    title: 'State', dataIndex: 'state', key: 'state',
                    render: (text, record, index) =>
                        <Steps size="small" direction="horizontal">
                            {text.map(({ username, time, desc, bool }, i) => (
                                <Step description={time} status={bool ? 'finish' : (bool !== undefined ? 'error' : 'process')}
                                    title={<PopCheck text={username} onOk={
                                        // todo fetch
                                        // check ability
                                        async () => {
                                            console.log('todo')
                                        }
                                    } />} subTitle={desc} key={i}
                                    onClick={() => {
                                        // todo reject
                                        console.log(1);

                                    }} />
                            ))}
                        </Steps>,
                },
            ]}
            dataSource={data}
            pagination={{
                total: data.length,
                onChange: () => { },
            }}
        /></Fragment>)
}