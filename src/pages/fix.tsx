import React, { FC, Fragment, useCallback, useEffect, useState } from "react";
import { Steps, Table, message, Image } from 'antd';
import { iFix } from "../type&interface";
import { PopCheck, FixRequest } from "../components";
import { store } from "../redux";
import { imgPath } from "../constant";

export const Fix: FC<any> = () => {
    const [user, setUser] = useState(store.getState().user)
    const [data, setData] = useState<iFix[]>([])
    const [load, setLoad] = useState(true)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const unsub = store.subscribe(() => {
            setUser(store.getState().user)
        })
        return unsub
    }, [])

    const $ = useCallback(async (num = 1, size = 10) => {
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

    const finalFix = async (_: any) => {
        try {
            const { success, data, message: m } = await Api.finalFix(_)
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
    }, [$])

    return <Fragment><FixRequest reload={$} />
        <Table
            dataSource={data} loading={load} pagination={{ total, onChange: $ }} rowKey='id'
            columns={[
                { title: 'Id', dataIndex: 'id', key: 'id' },
                {
                    title: '申请人', dataIndex: 'user', key: 'user',
                    render: (text, record, index) => <p>{text.name}</p>
                },
                {
                    title: '工夹具', dataIndex: 'fixture_', key: 'fixture_',
                    render: (text, record, index) => <Image width={100} height={100} src={imgPath + text.pic} />
                },
                { title: '备注', dataIndex: 'note', key: 'note' },
                {
                    title: '审批流程', dataIndex: 'state', key: 'state',
                    render: (text, record, index) =>
                        <Steps size="small" direction="horizontal">
                            {Array(2).fill('').map((_, i) => (
                                <Steps.Step description={text[i]?.time ?? ''}
                                    subTitle={text[i]?.desc ?? ['', '待维修',][i]} key={i}
                                    status={text[i]?.bool ? 'finish' : (text[i]?.bool !== undefined ? 'error' : 'process')}
                                    title={<PopCheck text={text[i]?.username ?? '待处理'}
                                        onOk={
                                            async () => {
                                                record.state[1] = { username: user?.name ?? '', time: new Date(), desc: '维修成功', bool: true }
                                                await finalFix(record)
                                            }}
                                        onCancel={
                                            async () => {
                                                record.state[1] = { username: user?.name ?? '', time: new Date(), desc: '维修失败', bool: false }
                                                await finalFix(record)
                                            }
                                        }
                                    />} />
                            ))}
                        </Steps>,
                },
            ]}
        /></Fragment>
}
