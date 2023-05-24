import {
  CheckOutlined,
  InfoOutlined,
  SearchOutlined,
  ArrowDownOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, theme } from "antd";
const { Content } = Layout;
import { Input, Row, Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;
import { useGetAllProjectQuery } from "./project/project.service";
import { useGetAllTaskQuery } from "./task/task.service";
import { useState, useEffect } from "react";
import AppSider from "../component/AppSider";
import AppNav from "../component/AppNav";
import { useNavigate } from "react-router-dom";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Modal } from "antd";
import "react-quill/dist/quill.snow.css";
import UpdateTask from "./task/UpdateTask";
import { ITask } from "../types/Task";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const showModal = (itemId: any) => {
    setSelectedItemId(itemId);
    handleOk(itemId);
    setIsModalOpen(true);
  };

  const handleOk = (itemId: any) => {
    console.log("ID đã chọn:", itemId);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [searchText, setSearchText] = useState("");

  const project = useGetAllProjectQuery();
  const currentProject = project.data;
  //console.log({ currentProject });

  const [searchValue, setSearchValue] = useState("");
  const { data } = useGetAllTaskQuery({ q: searchValue });

  const [filteredData, setFilteredData] = useState<ITask[]>(data);

  const handleSeach = (value: any) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (data) {
      const newFilteredData = data?.task
        .filter(
          (item: any) =>
            item.status === "BACKLOG" ||
            item.status === "SELECTED FOR DEVELOPMENT" ||
            item.status === "IN PROGRESS" ||
            item.status === "DONE"
        )
        .filter((item: any) => item.name.match(new RegExp(searchText, "gi")));

      const result = newFilteredData.sort((a: any, b: any) => {
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return a.position - b.position;
      });

      setFilteredData(result);
    }
  }, [data, searchText]);

  //const { mutate: updateTaskStatus } = useUpdateTaskStatusMutation()
  const handleOnDragEnd = (result: DropResult) => {
    const { destination, draggableId } = result;
    if (!destination) {
      return;
    }
    const tasksCoppy = Array.from(filteredData || []);

    let sourceTask = tasksCoppy.find((task) => task.id === draggableId);
    const destinationTasks = tasksCoppy.filter(
      (task) => task.status === destination.droppableId
    );

    if (destination.index === 0) {
      sourceTask = {
        ...sourceTask,
        position:
          destinationTasks.length > 0
            ? destinationTasks[destination.index].position - 1
            : 0,
        status: destination.droppableId,
      } as ITask;
    } else if (destination.index === destinationTasks.length) {
      sourceTask = {
        ...sourceTask,
        position:
          destinationTasks.length > 0
            ? destinationTasks[destination.index - 1].position + 1
            : 0,
        status: destination.droppableId,
      } as ITask;
    } else {
      sourceTask = {
        ...sourceTask,
        position:
          (destinationTasks[destination.index].position +
            destinationTasks[destination.index - 1].position) /
          2,
        status: destination.droppableId,
      } as ITask;
    }

    const newTask = tasksCoppy.map((task) =>
      task.id === draggableId ? sourceTask : task
    );

    const filteredTasks = newTask.filter(
      (task) => task !== undefined
    ) as ITask[];
    const sortedTasks = filteredTasks.sort((a, b) => {
      if (a.status < b.status) return -1;
      if (a.status > b.status) return 1;
      return a.position - b.position;
    });
    setFilteredData(sortedTasks);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signup");
  };

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      // Token chưa tồn tại trong localStorage, chuyển hướng đến trang đăng kí
      navigate("signup");
    } else {
      // Token đã tồn tại trong localStorage, chuyển hướng đến trang chủ
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <AppSider />

      <div className="content">
        <AppNav />
        <Layout
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "8px 50px 56px",
          }}
        >
          <div style={{ display: "flex" }}>
            <Breadcrumb
              style={{
                margin: "16px 0",
                fontSize: "16px",
              }}
            >
              <Breadcrumb.Item>Projects</Breadcrumb.Item>
              <Breadcrumb.Item>singularity 1.0</Breadcrumb.Item>
              <Breadcrumb.Item>Kanban Board</Breadcrumb.Item>
            </Breadcrumb>
            <LogoutOutlined
              style={{
                paddingLeft: "900px",
                paddingTop: "20px",
                fontSize: "20px",
              }}
              onClick={handleLogout}
            />
          </div>
          <Content
            style={{
              padding: 14,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <div className="item_input">
              <Input.Search
                style={{ width: "20%", marginBottom: "20px" }}
                placeholder="Search"
                prefix={<SearchOutlined />}
                onSearch={handleSeach}
              />

              <div className="avatars">
                <div className="box__image__avatar">
                  <img alt="" className="avatar__img" />
                </div>
                <div className="box__image__avatar">
                  <img alt="" className="avatar__img" />
                </div>
                <div className="box__image__avatar">
                  <img alt="" className="avatar__img" />
                </div>
              </div>

              <div className="item_input_name">Only My Issues</div>
            </div>

            <Row gutter={[16, 16]}>
              <div className="dragdrop">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <div className="card-text">
                    <h5>BACKLOG </h5>
                    <Droppable droppableId="BACKLOG">
                      {(provided: any) => (
                        <ul
                          style={{ padding: "0", listStyle: "none" }}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {filteredData
                            ?.filter(
                              (item) =>
                                item.status === "BACKLOG" &&
                                item.name.match(new RegExp(searchText, "gi"))
                            )
                            .map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided: any) => (
                                    <li
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                    >
                                      <span onClick={() => showModal(item.id)}>
                                        <Card
                                          hoverable
                                          style={{ width: 250, margin: "10px" }}
                                        >
                                          <Meta title={item.title} />
                                          <div className="card-text-icon">
                                            <div>
                                              <CheckOutlined
                                                style={{
                                                  color: "white",
                                                  fontSize: "12px",
                                                  marginRight: "8px",
                                                  backgroundColor:
                                                    "rgb(79, 173, 230)",
                                                }}
                                              />
                                              <ArrowDownOutlined
                                                style={{ color: "green" }}
                                              />
                                            </div>
                                            <div>
                                              <img
                                                style={{
                                                  width: "30px", // Kích thước ảnh nhỏ lại (thay đổi giá trị tùy ý)
                                                  height: "30px",
                                                  borderRadius: "50%", // Để bo thành hình tròn
                                                  objectFit: "cover",
                                                }}
                                                src={item.image}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        </Card>
                                      </span>

                                      <Modal
                                        open={isModalOpen}
                                        onOk={handleOk}
                                        onCancel={handleCancel}
                                        width={900}
                                      >
                                        <UpdateTask
                                          id={selectedItemId}
                                          setIsModalOpen={setIsModalOpen}
                                        />
                                      </Modal>
                                    </li>
                                  )}
                                </Draggable>
                              );
                            })}
                          {provided.placeholder}
                        </ul>
                      )}
                    </Droppable>
                  </div>

                  <div className="card-text">
                    <h5>SELECTED FOR DEVELOPMENT </h5>
                    <Droppable droppableId="SELECTED FOR DEVELOPMENT">
                      {(provided: any) => (
                        <ul
                          style={{ padding: "0", listStyle: "none" }}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {filteredData
                            ?.filter(
                              (item) =>
                                item.status === "SELECTED FOR DEVELOPMENT" &&
                                item.name.match(new RegExp(searchText, "gi"))
                            )
                            .map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided: any) => (
                                  <li
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                  >
                                    <span onClick={() => showModal(item.id)}>
                                      <Link to={``}>
                                        <Card
                                          hoverable
                                          style={{
                                            width: 250,
                                            margin: "10px",
                                          }}
                                        >
                                          <Meta title={item.title} />
                                          <div className="card-text-icon">
                                            <div>
                                              <CheckOutlined
                                                style={{
                                                  color: "white",
                                                  fontSize: "12px",
                                                  marginRight: "8px",
                                                  backgroundColor:
                                                    "rgb(79, 173, 230)",
                                                }}
                                              />
                                              <ArrowDownOutlined
                                                style={{ color: "green" }}
                                              />
                                            </div>
                                            <div>
                                              <Meta title={item.Assignees} />
                                              <div>
                                                <img
                                                  style={{
                                                    width: "30px", // Kích thước ảnh nhỏ lại (thay đổi giá trị tùy ý)
                                                    height: "30px",
                                                    borderRadius: "50%", // Để bo thành hình tròn
                                                    objectFit: "cover",
                                                  }}
                                                  src={item.image}
                                                  alt=""
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </Card>
                                      </Link>
                                    </span>
                                  </li>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </ul>
                      )}
                    </Droppable>
                  </div>

                  <div className="card-text">
                    <h5>IN PROGRESS </h5>
                    <Droppable droppableId="IN PROGRESS">
                      {(provided: any) => (
                        <ul
                          style={{ padding: "0", listStyle: "none" }}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {filteredData
                            ?.filter(
                              (item) =>
                                item.status === "IN PROGRESS" &&
                                item.name.match(new RegExp(searchText, "gi"))
                            )
                            .map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided: any) => (
                                  <li
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                  >
                                    <span onClick={() => showModal(item.id)}>
                                      {/* <Link to={``}>
                                        <Card
                                          hoverable
                                          style={{
                                            width: 250,
                                            margin: "10px",
                                          }}
                                        >
                                          <Meta title={item.title} />{" "}
                                          <div className="card-text-icon">
                                            {" "}
                                            {item.name &&
                                              (() => {
                                                try {
                                                  const parsedName = JSON.parse(
                                                    item.name
                                                  );
                                                  //console.log(parsedName);

                                                  if (parsedName.icon) {
                                                    return parsedName.icon ? (
                                                      <Icon
                                                        component={
                                                          icons[parsedName.icon]
                                                        }
                                                      />
                                                    ) : null;
                                                  }
                                                } catch (error) {
                                                  //console.error(error);
                                                }

                                                return null;
                                              })()}
                                            <div>
                                              <Meta title={item.Assignees} />
                                            </div>
                                          </div>
                                        </Card>
                                      </Link> */}
                                      <Card
                                        hoverable
                                        style={{ width: 250, margin: "10px" }}
                                      >
                                        <Meta title={item.title} />
                                        <div className="card-text-icon">
                                          <div>
                                            <CheckOutlined
                                              style={{
                                                color: "white",
                                                fontSize: "12px",
                                                marginRight: "8px",
                                                backgroundColor:
                                                  "rgb(79, 173, 230)",
                                              }}
                                            />
                                            <ArrowDownOutlined
                                              style={{ color: "green" }}
                                            />
                                          </div>
                                          <div>
                                            <img
                                              style={{
                                                width: "30px", // Kích thước ảnh nhỏ lại (thay đổi giá trị tùy ý)
                                                height: "30px",
                                                borderRadius: "50%", // Để bo thành hình tròn
                                                objectFit: "cover",
                                              }}
                                              src={item.image}
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                      </Card>
                                    </span>
                                  </li>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </ul>
                      )}
                    </Droppable>
                  </div>

                  <div className="card-text">
                    <h5>DONE</h5>
                    <Droppable droppableId="DONE">
                      {(provided: any) => (
                        <ul
                          style={{ padding: "0", listStyle: "none" }}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {filteredData
                            ?.filter(
                              (item) =>
                                item.status === "DONE" &&
                                item.name.match(new RegExp(searchText, "gi"))
                            )
                            .map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided: any) => (
                                  <li
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                  >
                                    <span onClick={() => showModal(item.id)}>
                                      <Link to={``}>
                                        <Card
                                          hoverable
                                          style={{
                                            width: 250,
                                            margin: "10px",
                                          }}
                                        >
                                          <Meta title={item.title} />
                                          <div className="card-text-icon">
                                            <div>
                                              <InfoOutlined
                                                style={{
                                                  color: "white",
                                                  marginRight: "8px",
                                                  borderRadius: "50%",
                                                  backgroundColor:
                                                    "rgb(228, 77, 66)",
                                                }}
                                              />
                                              <ArrowDownOutlined
                                                style={{ color: "green" }}
                                              />
                                            </div>
                                            <div>
                                              <Meta title={item.Assignees} />
                                            </div>
                                            <div>
                                              <img
                                                style={{
                                                  width: "30px", // Kích thước ảnh nhỏ lại (thay đổi giá trị tùy ý)
                                                  height: "30px",
                                                  borderRadius: "50%", // Để bo thành hình tròn
                                                  objectFit: "cover",
                                                }}
                                                src={item.image}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        </Card>
                                      </Link>
                                    </span>
                                  </li>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </ul>
                      )}
                    </Droppable>
                  </div>
                </DragDropContext>
              </div>
            </Row>
          </Content>
        </Layout>
      </div>
    </div>
  );
};
export default Dashboard;
