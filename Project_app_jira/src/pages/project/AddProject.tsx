import { useState } from "react";
import { Button, Form, Input, Select, notification, Layout, theme } from "antd";
import { useAddProjectMutation } from "./project.service";
const { Option } = Select;
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AppSider from "../../component/AppSider";
import AppNav from "../../component/AppNav";

const AddProject = () => {
  const [value, setValue] = useState("");

  const handleChange = (content: any) => {
    setValue(content);
  };

  const navigate = useNavigate();

  const [ProjectAdd] = useAddProjectMutation();

  const onFinish = (values: any) => {
    ProjectAdd(values);

    notification.success({
      message: "Project added successfully",
    });
    navigate("/project");
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div>
      <AppSider />

      <div className="content">
        <AppNav />

        <Layout>
          <div className="SideMenu">
            <h3>Add Project</h3>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600, margin: "0 auto" }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              //   onFinishFailed={onFinishFailed}
              autoComplete="off"
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

export default AddProject;
