import { useState, useEffect } from "react";
import {
  MenuFoldOutlined, MenuUnfoldOutlined, AppstoreOutlined, SearchOutlined, DownOutlined, ReloadOutlined, QuestionCircleOutlined, SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Table, Modal, Input, Dropdown, notification, Popconfirm, Form } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import pageViews from "../../db.json";
import axios from "axios";
import { DataSoure } from "../../interfaces/DataSoure";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const notify = () => toast("Wow so easy!");
  const [collapsed, setCollapsed] = useState(false);
  const [searchParams] = useSearchParams();
  const [project, setProject] = useState([]);
  const [dataSource, setDataSource] = useState<DataSoure[]>([]);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const response = await axios.get("http://localhost:1337/project");
      const projectDb = response.data;
      setProject(projectDb);
    } catch (error) {
      console.error(error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const currentPage = pageViews.find(
    (page) => page.id === searchParams.get("sid")
  );
  console.log(currentPage);

  const fetchData = async () => {
    const apis = currentPage?.apis || [];

    for (const api of apis) {
      if (
        api.method === "get" ||
        api.method === "create" ||
        api.method === "update" ||
        api.method === "delete"
      ) {
        try {
          const response = await axios[api.method](api.url);
          setDataSource(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);
  //console.log(dataSource);

  const handleDelete = async (_id: string) => {
    try {
      await axios.delete(`http://localhost:1337/project/${_id}`);
      fetchData();
      toast.success("Project deleted successfully👌❤️")
    } catch (error) {
      toast.error("Project deleted failed 😭")
    }
  };

  const btn = currentPage?.schema;
  //console.log(btn);
  const renderWidget = (widgetType: any, field: any) => {
    switch (widgetType) {
      case "Text":
        return <Input />;
      case "TextArea":
        return <Input.TextArea />;
      default:
        return null;
    }
  };

  const dataSourceMapped = dataSource.map((item) => {
    return {
      key: item.key,
      id: item.id,
      name: item.name,
      email: item.email,
      title: item.title,
      description: item.description,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      url: item.url,
    };
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const columns = [
    ...currentPage!.grid.map((column) => ({
      title: column.field,
      dataIndex: column.field,
      key: column.field,
    })),
    {
      title: "Action",
      render: (record: any) => (
        <Dropdown
          overlay={
            <Menu>
              {currentPage?.buttons.map((btn) => {
                if (btn.type === 'button') {
                  return (
                    <Menu.Item key={btn.title}>
                      {btn.title === 'Delete' ? (
                        <Popconfirm
                          title="Delete the task"
                          onConfirm={() => handleDelete(record.id)}
                          okText="Delete"
                          cancelText="Cancel"
                          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        >
                          <a>{btn.title}</a>
                        </Popconfirm>
                      ) : (
                        <a>{btn.title}</a>
                      )}
                    </Menu.Item>
                  );
                }
                return null;
              })}
            </Menu>
          }
        >

          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <SettingOutlined /> <DownOutlined />
          </a>
        </Dropdown>

      ),
    },
  ];

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <h2 style={{ color: "white", textAlign: "center" }}>Al Portal</h2>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={pageViews.map((pageView) => {
              return {
                key: pageView.name,
                icon: <AppstoreOutlined />,
                label: (
                  <Link to={`/admin?sid=${pageView.id}`}>{pageView.name}</Link>
                ),
              };
            })}
          />
        </Sider>

        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <h2>{currentPage?.name}</h2>

            <>
              <div>
                <div>
                  {currentPage?.buttons.map((btn) => {
                    if (btn.onViewScreen) {
                      return <button
                        onClick={showModal}
                        style={{
                          backgroundColor: "#17a2b8",
                          border: "none",
                          color: "white",
                          padding: "8px 20px",
                          display: "flex",
                          margin: " 0 0 14px 1114px",
                        }} key={btn.title}>{btn.title}
                      </button>;
                    }
                    return null;
                  })}

                  <Modal
                    title={currentPage?.name}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}

                  >
                    <Form onFinish={onFinish} initialValues={{}}>
                      {btn?.map((field: any) => {
                        return (
                          <Form.Item label={field.name} name={field.name} key={field.name}>
                            <Input />
                          </Form.Item>
                        )
                      })}

                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form>

                  </Modal>
                </div>

                <div style={{ marginLeft: "776px", marginTop: " 0 20px" }}>
                  <Input
                    style={{ width: "74%", marginBottom: "20px" }}
                    placeholder="Search"
                  />
                  <span
                    style={{
                      padding: "6px 8px",
                      backgroundColor: "#17a2b8",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <SearchOutlined />
                  </span>
                  <span
                    style={{
                      padding: " 6px 8px",
                      backgroundColor: "#17a2b8",
                      color: "white",
                      margin: "0 1px 0 10px",
                    }}
                  >
                    <DownOutlined />
                  </span>
                  <span
                    style={{
                      padding: " 6px 8px",
                      backgroundColor: "#17a2b8",
                      color: "white",
                    }}
                  >
                    <ReloadOutlined />
                  </span>
                </div>
              </div>
            </>
            <>
              <Table
                columns={columns}
                dataSource={dataSourceMapped}
              //onChange={handleChange}
              />
            </>
          </Content>
        </Layout>
      </Layout>
      <ToastContainer />
    </div>
  );
};

export default Admin;
