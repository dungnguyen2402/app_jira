import { InputNumber, Slider, Form, Input, Select, notification } from "antd";
const { Option } = Select;
import {
  useDeleteTaskMutation,
  useGetOneTaskQuery,
  useUpdateTaskMutation,
} from "./task.service";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { DeleteOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Cascader } from "antd";
import { Button, message, Popconfirm } from "antd";

const { SHOW_CHILD } = Cascader;

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    label: "Dung",
    value: "light",
  },
  {
    label: "DungNguyen",
    value: "bamboo",
  },
];

const text = "Are you sure to delete this task?";
const description = "Delete the task";

const confirm = () => {
  message.info("Clicked on Yes.");
};

// interface Props  {
//   onAdd: (product: IProduct) => void;
// }

const UpdateTask = ({ id }) => {
  const onChanges = (value: string[][]) => {
    console.log(value);
  };

  const [value, setValue] = useState("");

  const handleChange = (content: any) => {
    setValue(content);
  };

  const [inputValue, setInputValue] = useState("");

  const onChange = (newValue: number) => {
    setInputValue(newValue);
  };

  //console.log(id);

  const { data, isFetching } = useGetOneTaskQuery(id);
  //const navigate = useNavigate()
  const [taskUpdate] = useUpdateTaskMutation();
  //console.log(data);

  const onFinish = (values: any) => {
    taskUpdate({ id, ...values });

    //navigate("/project")
  };

  const [deleteTask] = useDeleteTaskMutation();

  const handleDeleteTask = (id: any) => {
    deleteTask(id);
    notification.success({
      message: "Task deleted successfully",
    });
    // navigate("/");
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="">
        <Popconfirm
          placement="top"
          title={text}
          description={description}
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
          onClick={() => handleDeleteTask(id)}
        >
          <DeleteOutlined
            style={{
              float: "right",
              cursor: "pointer",
              paddingRight: "30px",
              fontSize: "18px",
            }}
          />
        </Popconfirm>
        <Form
          // form ={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 800, margin: "0 auto", width: "700px" }}
          initialValues={{ remember: true, ...data }}
          onFinish={onFinish}
          autoComplete="off"
          key={JSON.stringify(isFetching)}
        >
          <div className="taskupdate">
            <div className="taskupdate_left">
              <Form.Item
                name="title"
                rules={[
                  { required: true, message: "Please input your title!" },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                required={false}
                style={{
                  fontSize: "50px",
                  fontWeight: "700",
                  fontFamily: "Arial",
                }}
              >
                <Input
                  style={{
                    border: "none",
                    fontSize: "30px",
                    fontWeight: "bold",
                  }}
                />
              </Form.Item>

              <Form.Item
                label=" Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input your description!",
                  },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                required={false}
                style={{ fontSize: "24", fontWeight: "700" }}
              >
                <ReactQuill
                  value={value}
                  onChange={handleChange}
                  style={{ border: "none" }}
                />
              </Form.Item>
            </div>

            <div className="taskupdate_right">
              {/* <Form.Item
                label="STATUS"
                name="status"
                rules={[{ required: true, message: "Please enter status" }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                required={false}
                style={{
                  fontSize: "24",
                  fontWeight: "700",
                  width: "200px",
                }}
              >
                <Select
                  style={{ backgroundColor: "rgb(223, 225, 230)" }}
                  placeholder="Select a option and change input text above"
                  //onChange={onGenderChange}
                  allowClear
                >
                  <Option value="64464f05041ceb258caa2e8d">BACKLOG</Option>
                  <Option value="2">SELECTED FOR DEVELOPMENT</Option>
                  <Option value="other">other</Option>
                </Select>
              </Form.Item> */}

              <Form.Item
                label="ASSIGNEES"
                name="assignees"
                rules={[{ required: true, message: "Please enter assignees" }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                required={false}
                style={{ fontSize: "24", fontWeight: "700" }}
              >
                <>
                  <br />
                  <Cascader
                    style={{ width: "100%" }}
                    options={options}
                    onChange={onChanges}
                    multiple
                    maxTagCount="responsive"
                    defaultValue={["bamboo"]}
                  />
                </>
              </Form.Item>
              <Form.Item
                label="REPORTER"
                name="reporter"
                rules={[{ required: true, message: "Please enter reporter" }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                required={false}
                style={{ fontSize: "24", fontWeight: "700", width: "140px" }}
              >
                <Select
                  placeholder="Select an option"
                  suffixIcon={null}
                  className="custom-select"
                  allowClear
                >
                  <Option value="64464f05041ceb258caa2e8d">male</Option>
                  <Option value="2">female</Option>
                  <Option value="other">other</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="PRIORITY"
                name="priority"
                rules={[{ required: true, message: "Please enter priority" }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                required={false}
                style={{ fontSize: "24", fontWeight: "700", width: "100px" }}
              >
                <Select
                  placeholder="Select a option and change input text above"
                  suffixIcon={null}
                  //onChange={onGenderChange}
                  allowClear
                >
                  <Option value="64464f05041ceb258caa2e8d">male</Option>
                  <Option value="2">female</Option>
                  <Option value="other">other</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="ORIGINAL ESTIMATE (HOURS)"
                name="originalEstimate"
                rules={[
                  {
                    required: true,
                    message: "Please input your originalEstimate!",
                  },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                required={false}
                style={{ fontSize: "24", fontWeight: "700" }}
              >
                <InputNumber
                  min={1}
                  max={20}
                  style={{ margin: "", width: "100%" }}
                  value={inputValue}
                  onChange={onChange}
                />
              </Form.Item>
              <Form.Item
                label="TIME TRACKING"
                rules={[
                  { required: true, message: "Please input your title!" },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                required={false}
                style={{}}
              >
                <div className="time_tracking">
                  <div>
                    <ClockCircleOutlined style={{ fontSize: "20px" }} />
                  </div>

                  <Slider
                    min={1}
                    max={10}
                    onChange={onChange}
                    value={typeof inputValue === "number" ? inputValue : 0}
                    trackStyle={{
                      backgroundColor: "blue",
                    }}
                    handleStyle={{
                      borderColor: "darkblue",
                      boxShadow: "0 0 0 3px darkblue",
                      borderWidth: "3px",
                    }}
                    style={{ width: "100%" }}
                  />
                </div>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default UpdateTask;
