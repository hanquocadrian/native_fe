import React, { Component } from 'react';
import auth from "Admin/auth";

export default class index extends Component {
    render() {
        const sendData = this.props.location.sendData;
        return (
            <>
                <p>About Admin</p>
                <p>
                    My name is { sendData.me }, height: { sendData.height }, weight: { sendData.weight }
                </p>
                <button onClick={ () => {
                    auth.logout(() => {
                        this.props.history.push("/admin/");
                    });
                }} >
                    Logout
                </button>
            </>
        )
    }
}
