import React, { Component } from 'react';

export default class Home extends Component {
    render() {
        return (
            <>
                <p>Hello Home page admin</p>
                <button onClick={ () => {
                    this.props.history.push({
                        pathname: '/admin/about/',
                        sendData: {
                            idRT: 1,
                            roomType: "H"
                        }
                    });
                }}>About</button>
            </>
        )
    }
}
