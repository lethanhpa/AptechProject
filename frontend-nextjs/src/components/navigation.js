import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, InboxOutlined } from '@ant-design/icons';
import Nav from 'react-bootstrap/Nav';
const Navigation = () => {
    return (
        <>
            <Menu mode="horizontal" theme="light" style={{ justifyContent: "center" }} >
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    <Nav.Link href="/">Home</Nav.Link>
                </Menu.Item>

                <Menu.Item key="products" icon={<InboxOutlined />}>
                    <Nav.Link href="/products">Products</Nav.Link>
                </Menu.Item>

                <Menu.Item key="profile" icon={<UserOutlined />}>
                    Profile
                </Menu.Item>
            </Menu>
        </>
    );
};

export default Navigation;