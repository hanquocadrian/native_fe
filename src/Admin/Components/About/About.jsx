// import React from 'react';
// import auth from "Admin/auth";

// export default class index extends Component {
//     render() {
//         const sendData = this.props.location.sendData;
//         return (
//             <>
//                 <p>About Admin</p>
//                 <p>
//                     My name is { sendData.me }, height: { sendData.height }, weight: { sendData.weight }
//                 </p>
//                 <button onClick={ () => {
//                     auth.logout(() => {
//                         this.props.history.push("/admin/");
//                     });
//                 }} >
//                     Logout
//                 </button>
//             </>
//         )
//     }
// }

import React, { useState, useEffect } from 'react';
import auth from 'Admin/auth';

function About(props) {
    const [sendData, setSendData] = useState({
        myName: "",
        height: 0,
        weight: 0
    });
    useEffect(() => {
        function getInfo (props) {
            setSendData({
                myName: props.location.sendData.me,
                height: props.location.sendData.height,
                weight: props.location.sendData.weight
            })
        }
        getInfo(props);
        return () => {
            // setSendData({sendData});
        }
    }, [props]);
    return (
        <>
            <h3>About Admin</h3>
            <p>
                My name is { sendData.myName }, height: { sendData.height }, weight: { sendData.weight }
            </p>
            <button onClick={ () => {
                auth.logout(() => {
                    props.history.push("/admin/");
                });
            }} >
                Logout
            </button>
        </>
    )
}

export default About


