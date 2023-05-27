import { useState, useRef } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ApartmentOutlined,
  FolderOpenOutlined,
  AppstoreOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import Admin from "./Admin";

const { Header, Sider, Content } = Layout;

type Props = {};

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const defaultPanes = new Array(2).fill(null).map((_, index) => {
  const id = String(index + 1);
  return {
    label: `Tab ${id}`,
    children: `Content of Tab Pane ${index + 1}`,
    key: id,
  };
});

const NavAdmin = (props: Props) => {
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

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
            onClick={(item) => add(item.key)}
            items={[
              {
                key: "1",
                icon: <AppstoreOutlined />,
                label: "Dashboard",
              },
              {
                key: "2",
                icon: <ApartmentOutlined />,
                label: "Model Config",
              },
              {
                key: "3",
                icon: <ContactsOutlined />,
                label: "User Config",
              },
              {
                key: "4",
                icon: <FolderOpenOutlined />,
                label: "Project Config",
              },
            ]}
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
          <Admin />
        </Layout>
      </Layout>
    </div>
  );
};

export default NavAdmin;
