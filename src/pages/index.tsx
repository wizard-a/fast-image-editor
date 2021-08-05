import React, { FC } from 'react';
import styles from './index.less';
import { Canvas, Layout } from '../components';

const { Header, Content, SliderLeft, SliderRight } = Layout;
export interface IIndexProps {}

const Index: FC<IIndexProps> = (props) => {
  return (
    <Layout>
      <Header />
      <Content>
        <SliderLeft></SliderLeft>
        <Canvas></Canvas>
        <SliderRight></SliderRight>
      </Content>
    </Layout>
  );
};

export default Index;
