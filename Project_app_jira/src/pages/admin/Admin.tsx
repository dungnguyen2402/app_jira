import { useState, useRef } from "react";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  AppstoreOutlined,
  ContactsOutlined,
  FolderOpenOutlined,
  ApartmentOutlined,
  SettingOutlined,
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  Space,
  Table,
  TableProps,
  Dropdown,
  Tabs,
  Input,
  Modal,
} from "antd";
import NavAdmin from "./NavAdmin";

const { Header, Sider, Content } = Layout;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

type Props = {};

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

//----------------------------------------------------------------

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const defaultPanes = new Array(2).fill(null).map((_, index) => {
  const id = String(index + 1);
  return {
    label: `Tab ${id}`,
    children: `Content of Tab Pane ${index + 1}`,
    key: id,
  };
});
//----------------------------------------------------------------

const Admin = (props: Props) => {
  /**  Modal */

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

  /**  End Modal */

  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  const [menuItems, setItems] = useState(defaultPanes);
  const newTabIndex = useRef(0);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const add = (key: string) => {
    const selectedItem = menuItems.find((item: any) => item.key == key);
    if (selectedItem) {
      const newActiveKey = `newTab${newTabIndex.current++}`;
      const newLabel = selectedItem.label;
      setItems([
        ...menuItems,
        { label: newLabel, children: "New Tab Pane", key: newActiveKey },
      ]);
      setActiveKey(newActiveKey);
    }
  };

  const remove = (targetKey: TargetKey) => {
    const targetIndex = menuItems.findIndex((pane) => pane.key == targetKey);
    const newPanes = menuItems.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey == activeKey) {
      const { key } =
        newPanes[
          targetIndex == newPanes.length ? targetIndex - 1 : targetIndex
        ];
      setActiveKey(key);
    }
    setItems(newPanes);
  };

  const onEdit = (targetKey: TargetKey, action: "add" | "remove") => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});

  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<DataType>);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">Update</Menu.Item>
              <Menu.Item key="2">Delete</Menu.Item>
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
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div>
      <Layout>
        <NavAdmin />

        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}></Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <>
              <Space style={{ marginBottom: 16 }}>
                <div>
                  <Tabs
                    hideAdd
                    onChange={onChange}
                    activeKey={activeKey}
                    type="editable-card"
                    onEdit={onEdit}
                    items={menuItems}
                  />
                </div>
              </Space>
              <div>
                <button
                  style={{
                    backgroundColor: "#17a2b8",
                    border: "none",
                    color: "white",
                    padding: "8px 20px",

                    margin: " 0 0 14px 1114px",
                  }}
                  onClick={showModal}
                  type="primary"
                >
                  <PlusOutlined />
                  Create
                </button>

                <Modal
                  title="Basic Modal"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </Modal>

                <div style={{ marginLeft: "776px", marginTop: " 0 20px" }}>
                  {/* -------- */}
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
                  {/* ---- */}
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
              <Table
                columns={columns}
                dataSource={data}
                onChange={handleChange}
              />
            </>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Admin;
