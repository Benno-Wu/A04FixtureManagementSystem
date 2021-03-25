import { Button, Popconfirm } from "antd";
import React, { FC } from "react";

export const PopCheck: FC<any> = ({ text, onOk }) => {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    const showPopconfirm = () => {
        setVisible(true);
    };

    // const handleOk = async () => {
    //     setConfirmLoading(true);
    //     const bool = await onOk()
    //     setTimeout(() => {
    //         setVisible(false);
    //         setConfirmLoading(false);
    //     }, 2000);
    // };
    async function handleOk() {
        setConfirmLoading(true);
        await onOk()
        // setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
        // }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
    return (<Popconfirm
        title="Approved?"
        visible={visible}
        okText="Yes"
        onConfirm={handleOk}
        okButtonProps={{ loading: confirmLoading }}
        onCancel={handleCancel}
    >
        <Button type="primary" shape="round" onClick={showPopconfirm}>
            {text}
        </Button>
    </Popconfirm>)
}