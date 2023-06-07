import React from 'react';
import axiosClient from '../../libraries/axiosClient';
import Moment from "moment";

const ProfilePage = (props) => {
    const { customers } = props;
    return (
        <>
            {customers.map((item) => (
                item._id === "647f88f4373ea20d1d07ceee" && (
                    <div>
                        <h1>Profile User</h1>
                        <p>Name: {item.lastName} {item.firstName}</p>
                        <p>Email: {item.email}</p>
                        <p>Phone Number: {item.phoneNumber}</p>
                        <p>Address: {item.address}</p>
                        <p>Birthday: {Moment(item.birthday).format("DD/MM/YYYY")}</p>
                    </div>
                )
            ))
            }
        </>
    );
};

export default ProfilePage;

export async function getStaticProps() {
    try {
        const response = await axiosClient.get("/customers");

        return {
            props: {
                customers: response.data
            },

        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}