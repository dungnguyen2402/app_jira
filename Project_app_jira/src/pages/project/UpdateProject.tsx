import { useState } from "react";
import { Button, Form, Input, Select, Layout, Menu, theme } from "antd";
const { Option } = Select;
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  SettingOutlined,
  CreditCardOutlined,
  HomeOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;
import { LogoSideNav } from "../../layout/LogoSideNav";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  useGetAllProjectQuery,
  useGetOneProjectQuery,
  useUpdateProjectMutation,
} from "./project.service";
import AppSider from "../../component/AppSider";

const items2 = [
  {
    icon: <HomeOutlined style={{ fontSize: "20px", color: "black" }} />,
    label: <Link to="/">Kanban Board</Link>,
  },
  {
    icon: <SettingOutlined style={{ fontSize: "20px", color: "black" }} />,
    label: <Link to="/project/:id">Project Setting</Link>,
  },
  {
    icon: <CreditCardOutlined style={{ fontSize: "20px", color: "black" }} />,
    label: <Link to="/issue-and-filters">Issure and filters</Link>,
  },
  {
    icon: <PlusOutlined style={{ fontSize: "20px", color: "black" }} />,
    label: <Link to="/addtask">Add Issure</Link>,
  },
  {
    icon: <SearchOutlined style={{ fontSize: "20px", color: "black" }} />,
    label: <Link to="/search-issue">Search Issure</Link>,
  },
];

const UpdateProject = () => {
  const [value, setValue] = useState("");

  const handleChange = (content: any) => {
    setValue(content);
  };

  const { id } = useParams<{ id: any }>();
  const { data, isFetching } = useGetOneProjectQuery(id);
  const navigate = useNavigate();
  const [projectUpdate] = useUpdateProjectMutation();
  console.log(data);

  const project = useGetAllProjectQuery();
  const currentProject = project.data;
  console.log({ currentProject });

  const onFinish = (values: any) => {
    projectUpdate({ id, ...values });

    navigate("/project");
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div>
      <AppSider />

      <div className="content">
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
            paddingLeft: "76px",
          }}
        >
          <div className="logo">
            <div>
              <LogoSideNav />
            </div>
            {currentProject && (
              <div className="logo_nav_text">
                <h5 className="logo_nav" style={{ display: "inline-block" }}>
                  {currentProject.name}
                </h5>
                <p style={{ display: "inline-block", margin: "0" }}>
                  Business project
                </p>
              </div>
            )}
          </div>
          <Menu
            style={{
              width: "200px",
              height: "100vh",
              paddingLeft: "8px",
              fontSize: "15px",
              backgroundColor: "rgb(244, 245, 247)",
              borderRightColor: "gray",
            }}
            items={items2}
          />
        </Sider>

        <Layout>
          <div className="SideMenu">
            <h3>Update Project</h3>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600, margin: "0 auto" }}
              initialValues={{ remember: true, ...data }}
              onFinish={onFinish}
              autoComplete="off"
              key={JSON.stringify(isFetching)}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                required={false}
                style={{ fontSize: "24", fontWeight: "700" }}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Url"
                name="url"
                rules={[{ required: true, message: "Please input your url!" }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                required={false}
                style={{ fontSize: "24", fontWeight: "700" }}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label=" Description"
                name="description"
                rules={[
                  { required: true, message: "Please input your description!" },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                required={false}
                style={{ fontSize: "24", fontWeight: "700" }}
              >
                <ReactQuill value={value} onChange={handleChange} />
              </Form.Item>

              <Form.Item
                label="Project Category"
                name="project_category"
                rules={[
                  { required: true, message: "Please enter project_categ" },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                required={false}
                style={{ fontSize: "24", fontWeight: "700" }}
              >
                <Select
                  placeholder="Select a option and change input text above"
                  //onChange={onGenderChange}
                  allowClear
                >
                  <Option value="64464f05041ceb258caa2e8d">male</Option>
                  <Option value="2">female</Option>
                  <Option value="other">other</Option>
                </Select>
                {/* <Select
                        placeholder="Lựa chọn category" allowClear>
                        {props.categories.map((item)=>{ 
                        
                        //console.log(props);
                        
                          return(
                              <Option value={`${item._id}`}>{item.name}</Option>
                          )
                        })}
                      </Select> */}
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginBottom: "20px" }}
                >
                  Add Issue
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default UpdateProject;
