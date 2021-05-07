import { Button, Popconfirm, Spin } from "antd";
import React, { FC } from "react";

export const PopCheck: FC<{ text: string, onOk: () => Promise<any>, onCancel: Function }> = ({ text, onOk, onCancel }) => {
    const [loading, setLoading] = React.useState(false);

    async function handleOk() {
        setLoading(true);
        await onOk()
        setLoading(false);
    }

    const handleCancel = async () => {
        setLoading(true);
        await onCancel()
        setLoading(false);
    }

    return (<Popconfirm
        title="Approved?"
        okText="Yes"
        onConfirm={handleOk}
        cancelText="No"
        onCancel={handleCancel}
    >
        <Spin spinning={loading} />
        <Button type="primary" shape="round">{text}</Button>
    </Popconfirm>)
}