import React, { FC, useEffect } from 'react';
import styles from './index.less';
import { Canvas, Layout } from '../canvas-components';
// import { ContextMenu } from '@/components';
import { history } from 'umi';
import useAuth from '@/hooks/useAuth';

const { Header, Content, SliderLeft, SliderRight } = Layout;
export interface IIndexProps {}

const Index: FC<IIndexProps> = (props) => {
  const isAuth = useAuth();
  useEffect(() => {
    if (!isAuth) {
      history.push('/login');
    }
  }, []);

  return (
    <React.Fragment>
      {/* <ContextMenu /> */}
      <Layout>
        <Header />
        <Content>
          <SliderLeft></SliderLeft>
          <Canvas></Canvas>
          <SliderRight></SliderRight>
        </Content>
      </Layout>
    </React.Fragment>
  );
};

export default Index;
