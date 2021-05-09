import React, { FC, useCallback, useEffect, useState } from "react";
import { message, Steps, Table, Image } from 'antd';
import { iPurchase } from "../type&interface";
import { PurchaseRequest } from "../components/PurchaseRequest";
import { PopCheck } from "../components";
import { store } from "../redux";
import { imgPath } from "../constant";

export const Purchase: FC<any> = () => {
    const [user, setUser] = useState(store.getState().user)
    const [data, setData] = useState<iPurchase[]>([])
    const [load, setLoad] = useState(true)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const unsub = store.subscribe(() => {
            setUser(store.getState().user)
        })
        return unsub
    }, [])

    const $ = async (num: number = 1, size: number = 10) => {
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
    }

    const firstPurchase = async (_: any) => {
        try {
            const { success, data, message: m } = await Api.firstPurchase(_)
            if (success) {
                $(1, 10)
            } else { message.info(m) }
        } catch (e) {
            message.info('网络异常，请稍后再试')
        }
    }
    const finalPurchase = async (_: any) => {
        try {
            const { success, data, message: m } = await Api.finalPurchase(_)
            if (success) {
                $(1, 10)
            } else { message.info(m) }
        } catch (e) {
            message.info('网络异常，请稍后再试')
        }
    }

    useEffect(() => {
        const _ = async () => { await $(1, 10) }
        _()
    }, [])
    return <><PurchaseRequest reload={$} />
        <Table dataSource={data} loading={load} pagination={{ total, onChange: $ }} rowKey='id'
            columns={[
                { title: 'id', dataIndex: 'id', key: 'id' },
                { title: '订单编号', dataIndex: 'billNo', key: 'billNo' },
                { title: '价格', dataIndex: 'price', key: 'price' },
                {
                    title: '审批流程', dataIndex: 'state', key: 'state',
                    render: (text, record, index) =>
                        <Steps size="small" direction="horizontal">
                            {Array(3).fill('').map((_, i) => (
                                <Steps.Step description={text[i]?.time ?? ''}
                                    subTitle={text[i]?.desc ?? ['', '初审', '终审'][i]} key={i}
                                    status={text[i]?.bool ? 'finish' : (text[i]?.bool !== undefined ? 'error' : 'process')}
                                    title={<PopCheck text={text[i]?.username ?? '待审核'}
                                        onOk={
                                            async () => {
                                                if (i === 1) {
                                                    record.state[i] = { username: user?.name ?? '', time: new Date(), desc: '初审通过', bool: true }
                                                    await firstPurchase(record)
                                                } else if (i === 2) {
                                                    record.state[i] = { username: user?.name ?? '', time: new Date(), desc: '终审通过', bool: true }
                                                    await finalPurchase(record)
                                                }
                                            }}
                                        onCancel={
                                            async () => {
                                                if (i === 1) {
                                                    record.state[i] = { username: user?.name ?? '', time: new Date(), desc: '初审未通过', bool: false }
                                                    await firstPurchase(record)
                                                } else if (i === 2) {
                                                    record.state[i] = { username: user?.name ?? '', time: new Date(), desc: '终审未通过', bool: false }
                                                    await finalPurchase(record)
                                                }
                                            }
                                        }
                                    />} />
                            ))}
                        </Steps>,
                },
            ]}
            expandable={{
                expandedRowRender: record => <Table scroll={{ x: 1000 }} dataSource={record.fixture} pagination={false}
                    columns={[
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
                    ]} />,
                rowExpandable: record => record.fixture.length !== 0,
            }}
        /></>
}