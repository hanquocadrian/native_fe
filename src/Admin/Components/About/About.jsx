import React, { Component } from 'react';
import auth from "../../auth";

export default class index extends Component {
    render() {
        return (
            <>
                <p>About Admin</p>
                <p>
                    This is { this.props.location.sendData.roomType }
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
