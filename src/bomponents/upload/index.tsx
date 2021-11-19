import React, { FC, useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import useToken from '@/hooks/useToken';

import type { UploadChangeParam } from 'antd/lib/upload/interface';

export interface IUploadProps {
  onUploadSuccess?: () => void;
}

const MyUpload: FC<IUploadProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const token = useToken();
  const uploadProps = {
    name: 'file',
    action: '/api/upload',
    showUploadList: false,
    headers: {
      Authorization: token as string,
    },
    onChange(info: UploadChangeParam) {
      setLoading(true);
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        setLoading(false);
        message.success(`${info.file.name} 文件上传成功！`);
      } else if (info.file.status === 'error') {
        setLoading(false);
        message.error(`${info.file.name} 文件上传失败.`);
      }
    },
  };

  console.log('token=>', token);
  return (
    <Upload {...uploadProps}>
      <Button loading={loading} icon={<UploadOutlined />} type="primary">
        上传
      </Button>
    </Upload>
  );
};

export default MyUpload;
