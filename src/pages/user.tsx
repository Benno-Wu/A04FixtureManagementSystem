import React, { FC, Fragment, useCallback, useEffect, useState } from "react";
import { message, Progress, Table } from 'antd';
import { iUser } from "../type&interface";
import { roleMap } from "../constant";
import { SafetyCertificateTwoTone } from "@ant-design/icons";

export const User: FC<any> = () => {
    const [data, setData] = useState<iUser[]>([])
    const [load, setLoad] = useState(true)
    const [total, setTotal] = useState(0)
    const $ = useCallback(async (num, size) => {
        try {
            const _ = await Api.allUser({ num, size })
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

    return (<Table dataSource={data} loading={load} rowKey="id" pagination={{ total, onChange: $ }}
        columns={[
            { title: 'Id', dataIndex: 'id', key: 'id' },
            { title: '编码/登录名', dataIndex: 'user', key: 'user' },
            { title: '姓名', dataIndex: 'name', key: 'name' },
            { title: '创建时间', dataIndex: 'born', key: 'born' },
            {
                title: '权限', dataIndex: 'authority', key: 'authority',
                render: (v, record, index) => <>
                    {Object.keys(v).map((key, i) => <Fragment key={i}>
                        <SafetyCertificateTwoTone />
                        {{ scheduling: '出入库', purchase: '采购', fix: '维修', useless: '报废', fixture: '工夹具', user: '用户', }[key]}
                        <Progress percent={(v as any)[key] / (roleMap.admin as any)[key] * 100} status="active"
                            format={(percent, successPercent) => percent?.toFixed(0) + '%'} />
                    </Fragment>)}
                </>
            },
        ]}
    />)
}