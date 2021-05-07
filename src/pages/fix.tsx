// @ts-nocheck

import React, { FC, Fragment, useCallback, useEffect, useState } from "react";
import { Popconfirm, Steps, Table, Button, message } from 'antd';
import { iFix } from "../type&interface";
import { ColumnsType } from "antd/es/table";
import { PopCheck, FixRequest } from "../components";
const { Step } = Steps

export const Fix: FC<any> = () => {
    const [data, setData] = useState<Partial<iFix>[]>([])
    const [load, setLoad] = useState(true)
    const [total, setTotal] = useState(0)

    const $ = useCallback(async (num, size) => {
        try {
            const _ = await Api.pagedFix({ size, num })
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
        // setData([
        //     {
        //         key: 1,
        //         id: 1,
        //         state: [
        //             { username: 1, time: 2, desc: 'test0', bool: true },
        //             { username: 1, time: 2, desc: 'test1', bool: undefined },
        //             { username: 1, time: 2, desc: 'test2', bool: true },],
        //         user: { id: 1, },
        //         fixture: 'New York No. 1 Lake Park',
        //         description: 'My id is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
        //     },
        //     {
        //         key: 2,
        //         id: 2,
        //         state: [
        //             { username: 'undefined', time: 2, desc: 'test3', bool: true },
        //             { username: 'undefined', time: 2, desc: 'test4', bool: false },
        //             { username: 'undefined', time: 2, desc: 'test5', bool: true },],
        //         user: 'aa',
        //         fixture: 'London No. 1 Lake Park',
        //         description: 'My id is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
        //     },
        // ])
    }, [$])

    return (<Fragment>
        <FixRequest />
        <Table
            dataSource={data} loading={load} pagination={{ total, onChange: $ }}
            columns={[
                { title: 'Id', dataIndex: 'id', key: 'id' },
                { title: '申请人', dataIndex: 'user', key: 'user' },
                { title: '工夹具', dataIndex: 'fixture', key: 'fixture' },
                {
                    title: '审批流程', dataIndex: 'state', key: 'state',
                    render: (text, record, index) =>
                        <Steps size="small" direction="horizontal">
                            {text.map(({ username, time, desc, bool }, i) => (
                                <Step description={time} status={bool ? 'finish' : (bool !== undefined ? 'error' : 'process')}
                                    title={<PopCheck text={username} onOk={
                                        // todo fetch
                                        // check auth, success front-self change, message when error
                                        async () => {
                                            return new Promise((res) => {
                                                setTimeout(res, 1000)
                                                console.log('todo')
                                            })
                                        }
                                    } onCancel={
                                        // todo fetch reject
                                        async () => {
                                            return new Promise((res) => {
                                                setTimeout(res, 500)
                                                console.log('todo')
                                            })
                                        }
                                    }
                                    />} subTitle={desc} key={i} />
                            ))}
                        </Steps>,
                },
            ]}
        /></Fragment>)
}