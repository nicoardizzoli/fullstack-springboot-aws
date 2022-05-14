import React, {useEffect, useState} from 'react';
import {deleteStudent, getAllStudents} from "./client";

import './App.css';
import {Avatar, Badge, Breadcrumb, Button, Empty, Layout, Menu, Popconfirm, Radio, Spin, Table, Tag} from "antd";
import {
    DesktopOutlined,
    FileOutlined,
    LoadingOutlined,
    PieChartOutlined,
    PlusOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import StudentDrawerForm from "./StudentDrawerForm";
import {errorNotification, successNotification} from "./Notification";


const {Header, Content, Footer, Sider} = Layout;

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

function App() {
    //USESTATE SE USA PARA MANEJAR EL ESTADO DE LA APP Y POR EJ TRAER COSAS DEL BACKEND
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    const renderStudents = () => {
        if (fetching) {
            return <Spin indicator={antIcon}></Spin>
        }
        if (students.length <= 0) {
            return <>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                    Add New Student
                </Button>
                <StudentDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchStudents={fetchStudents}
                />
                <Empty/>
            </>
        }

        return <>
            <StudentDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchStudents={fetchStudents}
            />
            <Table dataSource={students} columns={columns(fetchStudents)} bordered
                   title={() =>
                       <>

                           <Tag>Number of students</Tag>
                           <Badge count={students.length} overflowCount={10000}>
                           </Badge>
                           <br/>
                           <br/>
                           <Button onClick={() => setShowDrawer(!showDrawer)} type="primary" shape="round"
                                   icon={<PlusOutlined/>} size="small">
                               Add New Student
                           </Button>
                       </>
                   }
                   pagination={{pageSize: 50}} scroll={{y: 600}} rowKey={(student) => student.id}
            />;
        </>;

    }

    const TheAvatar = ({name}) => {
        if (name.trim().length === 0) {
            return <Avatar icon={<UserOutlined/>}/>
        }

        const split = name.trim().split(" ");
        if (split.length === 1) {
            return <Avatar>{name.charAt(0)}</Avatar>
        }

        return <Avatar>{`${name.charAt(0)}${name.charAt(name.length - 1)}`}</Avatar>

    }

    const removeStudent = (studentId, callback) => {
            deleteStudent(studentId).then(() => {
            successNotification("Student deleted", `Student with ${studentId} was deleted`);
            callback();
        });
    }

    const columns = fetchStudents => [

        // {
        //     title: '',
        //     dataIndex: 'avatar',
        //     key: 'avatar',
        //     // render: (student) => <TheAvatar name={student.name}/>
        //
        // },
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
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, student) =>
                <Radio.Group>
                    <Popconfirm
                        placement='topRight'
                        title={`Are you sure to delete ${student.name}`}
                        onConfirm={() => removeStudent(student.id, fetchStudents)}
                        okText='Yes'
                        cancelText='No'>
                        <Radio.Button value="small">Delete</Radio.Button>
                    </Popconfirm>
                    <Radio.Button value="small">Edit</Radio.Button>
                </Radio.Group>
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
        getItem('Option 1', '1', <PieChartOutlined/>),
        getItem('Option 2', '2', <DesktopOutlined/>),
        getItem('User', 'sub1', <UserOutlined/>, [
            getItem('Tom', '3'),
            getItem('Bill', '4'),
            getItem('Alex', '5'),
        ]),
        getItem('Team', 'sub2', <TeamOutlined/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        getItem('Files', '9', <FileOutlined/>),
    ];


    const fetchStudents = () => getAllStudents()
        .then(res => res.json())
        .then(data => {
            setStudents(data);
            setFetching(false);
        }).catch(err => {
            console.log(err.response);
            err.response.json().then(res => {
                console.log(res);
                errorNotification("There was an issue", res.message);
            });
        });

    //ES COMO EL OnINIT, se ejecuta esto cuando se crea el component
    useEffect(() => {
        console.log("component is mounted");
        fetchStudents();
    }, []);


    return <Layout
        style={{
            minHeight: '100vh',
        }}
    >
        <Sider collapsible collapsed={collapsed} onCollapse={c => setCollapsed(c)}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
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
                    {/*<Breadcrumb.Item>User</Breadcrumb.Item>*/}
                    {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
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
                Developed by NicoArdizzoli
            </Footer>
        </Layout>
    </Layout>

}

export default App;
