import React, { useEffect, useState } from "react";
import Moment from "moment";
import {
  Button,
  Space,
  Table,
  message,
  Popconfirm,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import axios from "../../libraries/axiosClient.js";
const { Column } = Table;
const apiName = "/employees";

export default function ManageEmployees() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const [showTable, setShowTable] = useState(true);
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [refresh, setRefresh] = React.useState(0);
  const text = "Are you sure you want to delete?";
  const description = "Delete the it";

  useEffect(() => {
    axios
      .get(apiName)
      .then((response) => {
        const { data } = response;
        setData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  const onFinish = (values) => {
    axios
      .post(apiName, values)
      .then((_response) => {
        setRefresh((f) => f + 1);
        createForm.resetFields();
        message.success("New added employee successfully!", 1.5);
        setShowTable(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onUpdateFinish = (values) => {
    axios
      .patch(apiName + "/" + updateId, values)
      .then((_response) => {
        setRefresh((f) => f + 1);
        updateForm.resetFields();
        message.success("Update successfully!", 1.5);
        setOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {showTable === false ? (
        <>
          <div style={{ textAlign: "left" }}>
            <Button
              type="primary"
              ghost
              onClick={() => {
                setShowTable(true);
              }}
            >
              <UnorderedListOutlined />
            </Button>
          </div>
          <h1 style={{ fontSize: "32px" }}>ADD EMPLOYEES</h1>
          {/* CREATE FORM */}
          <Form
            style={{ width: "80%" }}
            form={createForm}
            name="create-form"
            onFinish={onFinish}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
          >
            <Form.Item label="First Name" name="firstName" hasFeedback>
              <Input />
            </Form.Item>

            <Form.Item label="Last Name" name="lastName" hasFeedback>
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email to required",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password to required",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Phone Number to required",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>

            <Form.Item label="Address" name="address" hasFeedback>
              <Input />
            </Form.Item>

            <Form.Item label="Birthday" name="birthday" hasFeedback>
              <Input />
            </Form.Item>
            <Form.Item label="Role" name="role" hasFeedback>
              <Select style={{ width: "80%" }}>
                <Select.Option value="Admin">Admin</Select.Option>
                <Select.Option value="Employee">Employee</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "140px", height: "35px", fontSize: "18px" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <>
          <div style={{ textAlign: "left" }}>
            <Button
              type="primary"
              ghost
              onClick={() => {
                setShowTable(false);
              }}
            >
              <UnorderedListOutlined />
            </Button>
          </div>
          <h1 style={{ fontSize: "32px", textAlign: "center" }}>EMPLOYEES</h1>
          <Table dataSource={data} rowKey="_id">
            <Column title="First Name" dataIndex="firstName" key="firstName" />
            <Column title="Last Name" dataIndex="lastName" key="lastName" />
            <Column title="Email" dataIndex="email" key="email" />
            <Column
              title="Birthday"
              dataIndex="birthday"
              key="birthday"
              render={(text) => {
                return <span>{Moment(text).format("DD/MM/YYYY")}</span>;
              }}
            />
            <Column
              title="Phone Number"
              dataIndex="phoneNumber"
              key="phoneNumber"
            />
            <Column title="Address" dataIndex="address" key="address" />
            <Column title="Role" dataIndex="role" key="role" />
            <Column
              title="Action"
              key="action"
              render={(record) => (
                <Space size="middle">
                  <Button
                    type="primary"
                    ghost
                    icon={<EditOutlined />}
                    onClick={() => {
                      setOpen(true);
                      setUpdateId(record._id);
                      updateForm.setFieldsValue(record);
                    }}
                  >
                    Edit
                  </Button>
                  <Popconfirm
                    placement="topRight"
                    title={text}
                    description={description}
                    onConfirm={() => {
                      axios.delete(apiName + "/" + record.id).then(() => {
                        setRefresh((f) => f + 1);
                        message.success("Delete successfully!", 1.5);
                      });
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger icon={<DeleteOutlined />}>
                      Delete
                    </Button>
                  </Popconfirm>
                </Space>
              )}
            />
          </Table>
          <Modal
            open={open}
            title="Update"
            onCancel={() => {
              setOpen(false);
            }}
            cancelText="Close"
            okText="Update"
            onOk={() => {
              updateForm.submit();
            }}
          >
            <Form
              form={updateForm}
              name="update-form"
              onFinish={onUpdateFinish}
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
            >
              <Form.Item label="First Name" name="firstName" hasFeedback>
                <Input />
              </Form.Item>

              <Form.Item label="Last Name" name="lastName" hasFeedback>
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Email to required",
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Phone Number to required",
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>

              <Form.Item label="Address" name="address" hasFeedback>
                <Input />
              </Form.Item>

              <Form.Item label="Birthday" name="birthday" hasFeedback>
                <Input />
              </Form.Item>
              <Form.Item label="Role" name="role" hasFeedback>
              <Select style={{ width: "80%" }}>
                <Select.Option value="Admin">Admin</Select.Option>
                <Select.Option value="Employee">Employee</Select.Option>
              </Select>
            </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </div>
  );
}
