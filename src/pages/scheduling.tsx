import React, { FC, useCallback, useEffect, useState } from "react";
import { message, Steps, Table, Image } from 'antd';
import { iScheduling } from "../type&interface";
import { SchedulingRequest } from "../components/SchedulingRequest";
import { imgPath } from "../constant";

export const Scheduling: FC<any> = () => {
    const [data, setData] = useState<iScheduling[]>([])
    const [load, setLoad] = useState(true)
    const [total, setTotal] = useState(0)
    const $ = useCallback(async (num = 1, size = 10) => {
        try {
            const _ = await Api.pagedScheduling({ num, size })
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

    return <><SchedulingRequest reload={$} />
        <Table rowKey='id' dataSource={data} loading={load} pagination={{ total, onChange: $ }}
            columns={[
                { title: 'Id', dataIndex: 'id', key: 'id' },
                {
                    title: '申请人', dataIndex: 'user_', key: 'user_',
                    render: (text, record, index) => <p>{text.name}</p>
                },
                {
                    title: '工夹具', dataIndex: 'fixture_', key: 'fixture_',
                    render: (text, record, index) =>
                        <Image width={100} height={100} src={imgPath + text.pic} />
                },
                {
                    title: '编码', dataIndex: 'fixture_', key: 'fixture_',
                    render: (text, record, index) => <p>{text.code}</p>
                },
                {
                    title: '位置', dataIndex: 'fixture_', key: 'fixture_',
                    render: (text, record, index) => <p>{text.location}</p>
                },
                {
                    title: '出入库', dataIndex: 'state', key: 'state',
                    render: (t, record, index) => {
                        const text = t.slice(-1)[0]
                        return <Steps size="small" direction="horizontal">
                            {<Steps.Step description={text?.time} subTitle={text?.desc}
                                status={text?.bool ? 'error'
                                    : (text?.bool !== undefined ? 'finish' : 'process')}
                                title={text?.username}
                            />}
                        </Steps>
                    },
                },
            ]}
        /></>
}