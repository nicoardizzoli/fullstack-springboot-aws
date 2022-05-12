import React, {useEffect, useState} from 'react';
import {getAllStudents} from "./client";


import './App.css';
import {Breadcrumb, Empty, Layout, Menu, Spin, Table} from "antd";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LoadingOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function App() {
    //USESTATE SE USA PARA MANEJAR EL ESTADO DE LA APP Y POR EJ TRAER COSAS DEL BACKEND
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);

    const renderStudents = () => {
        if (fetching) {
            return <Spin indicator={antIcon}></Spin>
        }
        if (students.length <= 0) {
            return <Empty/>;
        }

        return <Table dataSource={students} columns={columns} bordered title={() => 'Customers'} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} rowKey={(student) => student.id}/>;

    }
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        }
    ];



    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    const items = [
        getItem('Option 1', '1', <PieChartOutlined />),
        getItem('Option 2', '2', <DesktopOutlined />),
        getItem('User', 'sub1', <UserOutlined />, [
            getItem('Tom', '3'),
            getItem('Bill', '4'),
            getItem('Alex', '5'),
        ]),
        getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        getItem('Files', '9', <FileOutlined />),
    ];



    const fetchStudents = () => getAllStudents()
        .then(res => res.json())
        .then(data => {
            setStudents(data);
            setFetching(false);
        });

    //ES COMO EL OnINIT, se ejecuta esto cuando se crea el component
    useEffect(() => {
        console.log("component is mounted");
        fetchStudents();
    }, []);


    return  <Layout
        style={{
            minHeight: '100vh',
        }}
    >
        <Sider collapsible collapsed={collapsed} onCollapse={c => setCollapsed(c)}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout className="site-layout">
            <Header
                className="site-layout-background"
                style={{
                    padding: 0,
                }}
            />
            <Content
                style={{
                    margin: '0 16px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        minHeight: 360,
                    }}
                >
                    {renderStudents()}
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Developed by NicoArdizzoliDEV
            </Footer>
        </Layout>
    </Layout>

}

export default App;
