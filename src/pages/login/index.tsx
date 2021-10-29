import React, { Component } from 'react';
import { Input, Form, Button } from 'antd';
import { login } from '@/services/user';
import { history } from 'umi';
import ProForm, { ProFormText, ProFormCaptcha } from '@ant-design/pro-form';
// import FormValid from '@/utils/formValid';

import { LocalStorage } from '@/utils';
import styles from './login.less';

class Login extends Component {
  onFinish = async ({ userName, pwd }: any) => {
    const res = await login(userName, pwd);
    console.log('res=>', res);
    LocalStorage.add('user', res.user);
    LocalStorage.add('token', res.token);
    history.push('/');
  };

  render() {
    return (
      <div className={styles.bg}>
        <div className={styles.wrapper}>
          <div className={styles.slogan}>
            图片 <br />
            编辑器
          </div>
          <div className={styles.login}>
            <div className={styles.title}>登录</div>
            <ProForm
              onFinish={this.onFinish}
              submitter={{
                searchConfig: {
                  submitText: '登录',
                },
                render: (_, dom) => dom.pop(),
                submitButtonProps: {
                  size: 'large',
                  style: {
                    width: '100%',
                  },
                },
              }}
            >
              <ProFormText
                fieldProps={{
                  size: 'large',
                }}
                name="userName"
                placeholder="请输入用户名"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                fieldProps={{
                  size: 'large',
                }}
                name="pwd"
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: '请输入密码!',
                  },
                ]}
              />
            </ProForm>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
