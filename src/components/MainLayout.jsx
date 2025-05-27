import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import './MainLayout.css';

const { Sider, Content } = Layout;
const { Title } = Typography;

const MainLayout = ({ children }) => {
  return (
    <Layout className="main-layout">
      <Sider 
        collapsed={true} 
        theme="light" 
        width={58}
        collapsedWidth={58}
        className="main-layout-sider"
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          className="menu-container"
          items={[
            {
              key: '1',
              icon: <RocketOutlined className="menu-icon" />,
            }
          ]}
        />
      </Sider>
      <Layout className="content-layout">
        <Content className="content-container">
          <Title level={4} className="content-title">Sucursales</Title>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
