import Moment from "moment";
import React, { useState, useEffect, memo } from "react";
import axiosClient from "@/libraries/axiosClient";
import jwt_decode from "jwt-decode";

const ProfilePage = () => {
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const token = localStorage.getItem("token");
                const decoded = jwt_decode(token);
                const customerId = decoded._id;
                console.log('customerId', customerId);

                const response = await axiosClient.get(`/customers/${customerId}`);
                console.log('««««« response »»»»»', response);
                const data = response.data;

                setCustomers(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCustomers();
    }, []);
    return (
        <>
            {customers ? (
                <div key={customers._id}>
                    <h1>Profile User</h1>
                    <p>Name: {customers.lastName} {customers.firstName}</p>
                    <p>Email: {customers.email}</p>
                    <p>Phone Number: {customers.phoneNumber}</p>
                    <p>Address: {customers.address}</p>
                    <p>Birthday: {Moment(customers.birthday).format("DD/MM/YYYY")}</p>
                </div>
            ) : (
                <div>
                    <h1>Thông tin người dùng không khả dụng</h1>
                </div>
            )}
        </>
    );
};

export default memo(ProfilePage);