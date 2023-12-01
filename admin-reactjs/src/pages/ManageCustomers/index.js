import React, { useEffect, useState } from "react";
import { Button, Space, Table, message } from "antd";
import {
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import axios from "../../libraries/axiosClient.js";
import Moment from "moment";

const { Column } = Table;
const apiName = "/customers";

export default function ManageCustomers() {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = React.useState(0);

  const lockCustomer = (customerId) => {
    axios
      .post(apiName + `/${customerId}/lock`)
      .then(() => {
        setRefresh((f) => f + 1);
        message.success("Lock successfully!", 1.5);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const unlockCustomer = (customerId) => {
    axios
      .post(apiName + `/${customerId}/unlock`)
      .then(() => {
        setRefresh((f) => f + 1);
        message.success("Unlock successfully!", 1.5);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
  return (
    <>
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
        <Column
          title="Status"
          dataIndex="isLocked"
          key="isLocked"
          render={(isLocked) => {
            const statusText = isLocked ? "Lock" : "UnLock";
            const statusColor = isLocked ? "red" : "green";

            return <span style={{ color: statusColor }}>{statusText}</span>;
          }}
        />
        <Column
          title="Action"
          key="action"
          render={(record) => (
            <Space size="middle">
              <Button
                danger
                icon={<LockOutlined />}
                onClick={() => lockCustomer(record._id)}
                disabled={record.isLocked}
              >
                Lock
              </Button>
              <Button
                type="primary"
                ghost
                icon={<UnlockOutlined />}
                onClick={() => unlockCustomer(record._id)}
                disabled={!record.isLocked}
              >
                Unlock
              </Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
}
