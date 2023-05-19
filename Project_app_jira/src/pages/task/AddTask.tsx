import { useState } from "react";
import { Button, Form, Input, Layout, Select, notification } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAddTaskMutation } from "./task.service";
import { useNavigate } from "react-router-dom";
import {
  CheckOutlined,
  InfoOutlined,
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
const { Option } = Select;
import AppSider from "../../component/AppSider";
import AppNav from "../../component/AppNav";

const AddTask = () => {
  const [value, setValue] = useState("");

  const handleChange = (content: any) => {
    setValue(content);
  };

  const navigate = useNavigate();

  const [TaskAdd] = useAddTaskMutation();

  const onFinish = (values: any) => {
    TaskAdd(values);

    notification.success({
      message: "Task added successfully",
    });
    navigate("/");
  };

  function handleSelectChange(value: any) {
    const option = JSON.parse(value);
    console.log(option.type); // logs the selected option type
    console.log(option.icon); // logs the selected option icon
  }

  return (
    <div>
      <AppSider />

      <div className="content">
        <AppNav />

        <Layout>
          <div className="SideMenu">
            <h3>Create Issue</h3>
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
                <Select
                  placeholder="Select a option and change input text above"
                  onChange={handleSelectChange}
                  allowClear
                >
                  <Option
                    value={JSON.stringify({
                      type: "task",
                      icon: "CheckOutlined",
                    })}
                  >
                    <CheckOutlined /> Task
                  </Option>
                  <Option
                    value={JSON.stringify({
                      type: "bug",
                      icon: "InfoOutlined",
                    })}
                  >
                    <InfoOutlined /> Bug
                  </Option>
                  <Option
                    value={JSON.stringify({
                      type: "story",
                      icon: "PlusOutlined",
                    })}
                  >
                    <PlusOutlined /> Story
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Short Summary"
                name="title"
                rules={[
                  { required: true, message: "Please input your title!" },
                ]}
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
                name="status"
                label="Status"
                rules={[
                  { required: true, message: "Please input your description!" },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                required={false}
                style={{ fontSize: "24", fontWeight: "700" }}
              >
                <Select
                  placeholder="Select a option status"
                  //onChange={onGenderChange}
                  allowClear
                >
                  <Option
                    value="BACKLOG"
                    style={{ color: "gray", fontWeight: "bold" }}
                  >
                    BACKLOG{" "}
                  </Option>
                  <Option
                    value="SELECTED FOR DEVELOPMENT"
                    style={{ color: "red", fontWeight: "bold" }}
                  >
                    SELECTED FOR DEVELOPMENT
                  </Option>
                  <Option
                    value="IN PROGRESS"
                    style={{ color: "blue", fontWeight: "bold" }}
                  >
                    IN PROGRESS{" "}
                  </Option>
                  <Option
                    value="DONE"
                    style={{ color: "green", fontWeight: "bold" }}
                  >
                    DONE{" "}
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Reporter"
                name="reporter"
                rules={[
                  { required: true, message: "Please enter field reporter" },
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
                  <Option value="male">
                    <div className="box__image">
                      <div>Lord Gaben</div>
                    </div>
                  </Option>
                  <Option value="female">
                    <div className="box__image">Pickle Rick</div>
                  </Option>
                  <Option value="other">
                    <div className="box__image">Baby Yoda</div>
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Assignees"
                name="assignees"
                rules={[{ required: true, message: "Please enter field" }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                required={false}
                style={{ fontSize: "24", fontWeight: "700" }}
              >
                <Select
                  placeholder="Select "
                  //onChange={onGenderChange}
                  allowClear
                >
                  <Option value="male">
                    <div className="box__image">
                      <div>Lord Gaben</div>
                    </div>
                  </Option>
                  <Option value="female">
                    <div className="box__image">
                      Pickle Rick
                    </div>
                  </Option>
                  <Option value="other">
                    <div className="box__image">
                      Baby Yoda
                    </div>
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Priority"
                name="priority"
                rules={[{ required: true, message: "Please enter field" }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                required={false}
                style={{ fontSize: "24", fontWeight: "700" }}
              >
                <Select
                  placeholder="Select a option"
                  //onChange={onGenderChange}
                  allowClear
                >
                  <Option value="male">
                    <div className="option_select">
                      <ArrowUpOutlined
                        className="option_select_icon"
                        style={{
                          color: "rgb(233, 127, 51)",
                          paddingRight: "10px",
                        }}
                      />
                      Highest
                    </div>
                  </Option>
                  <Option value="female">
                    <div className="option_select">
                      <ArrowUpOutlined
                        className="option_select_icon"
                        style={{
                          color: "rgb(205, 19, 23)",
                          paddingRight: "10px",
                        }}
                      />
                      Medium
                    </div>
                  </Option>
                  <Option value="hight">
                    <div className="option_select">
                      <ArrowUpOutlined
                        className="option_select_icon"
                        style={{
                          color: "rgb(205, 19, 23)",
                          paddingRight: "10px",
                        }}
                      />
                      High
                    </div>
                  </Option>
                  <Option value="low">
                    <div className="option_select">
                      <ArrowDownOutlined
                        className="option_select_icon"
                        style={{
                          color: "rgb(45, 135, 56)",
                          paddingRight: "10px",
                        }}
                      />
                      Low
                    </div>
                  </Option>
                  <Option value="lowest">
                    <div className="option_select">
                      <ArrowDownOutlined
                        className="option_select_icon"
                        style={{
                          color: "rgb(45, 135, 56)",
                          paddingRight: "10px",
                        }}
                      />
                      Lowest
                    </div>
                  </Option>
                </Select>
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

export default AddTask;
