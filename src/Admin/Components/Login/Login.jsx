import React, { Component } from 'react';
import auth from "../../auth";

export default class Login extends Component {
    render() {
        return (
            <>
                <p>Login to use me ^^</p>
                <button onClick={() => {
                    auth.login(() => {
                        this.props.history.push("/admin/home/");
                    });
                }} >
                    Login
                </button>
            </>
        )
    }
}
