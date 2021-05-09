
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';

function getBase64(img: Blob, callback: { (imageUrl: any): void; (arg0: string | ArrayBuffer | null): any; }) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file: { type: string; size: number; }) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

export class Uploader extends React.Component<{ img: string, setImg: Function }, { loading: boolean, imageUrl: string }> {
    state = {
        loading: false,
        imageUrl: this.props.img,
    };

    handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            // todo get the return url or something
            console.log('获得图片地址', info.file.response.data.url);
            this.props.setImg(info.file.response.data.url)
            getBase64(info.file.originFileObj, (imageUrl: any) => {
                this.setState({
                    imageUrl,
                    loading: false,
                })
            });
        }
    };

    render() {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <Upload
                listType="picture-card"
                showUploadList={false}
                action="http://127.0.0.1:3001/file/upload"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                maxCount={1}
                method='post'
                name="file"//后端接收文件参数名
            >
                {imageUrl ? <img src={imageUrl} alt="img" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        );
    }
}
