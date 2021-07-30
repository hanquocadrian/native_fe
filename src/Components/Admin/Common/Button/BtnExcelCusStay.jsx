import { Button, Col, Row, Upload, message } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import axios from 'axios';
import { url } from 'Api/url';

function BtnExcelCusStay(props) {
    const [fileExcel, setfileExcel] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const onSendCustomer = () => {
        // move upload file 
        var fd = new FormData();
        fd.append('fileCusStay', fileExcel);
        console.log('value fd: ',fd.getAll('fileCusStay'));
        axios.post(url + '/api/customer-stay/import-excel', fd, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(res => {
            props.onRefesh(true);
            alert(res.data);
            setIsModalVisible(false);
            setfileExcel(null);
        }).catch(err => {
            alert("Import Error");
        })
    }

    const showModalSearch = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
  
    return (
        <>
            <Button onClick={ showModalSearch }>Import Excel</Button>
            <Modal 
                title="Add list customer stay" 
                visible={ isModalVisible } 
                onCancel={ handleCancel } 
                footer={[
                    <>
                        <Button onClick={ onSendCustomer }>
                            Save
                        </Button>
                        <Button onClick={ handleCancel }>
                            Close
                        </Button>
                    </>

                ]}
            >
                <Row className="mb-15">
                    <Col xs={24} md={24} lg={12}><b>Room type image file:</b></Col>
                    <Col xs={24} md={24} lg={12}>
                        <Upload 
                            maxCount={1}
                            beforeUpload={ file => {
                                console.log(file);
                                const typeExcel = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
                                if (!typeExcel.includes(file.type)) {
                                    message.error(`${file.name} is not a .xlsx or .xls file`);
                                }
                                return typeExcel.includes(file.type) ? true : Upload.LIST_IGNORE;
                            }}
                            onChange={ info => {
                                if(info.fileList[0]){
                                    console.log('change raw: ', info.fileList[0]);
                                    console.log('change: ', info.fileList[0].originFileObj);
                                    setfileExcel(info.fileList[0].originFileObj);
                                }
                            }}
                            onRemove={ () => {
                                setfileExcel(null);
                            }}
                        >
                            <Button style={{ width: '225px' }} icon={<AiOutlineUpload style={{ fontSize: '20px' }} />}> <span style={{ lineHeight: '25px', fontSize: '15px', position: 'relative', top: '-3px', paddingLeft: '5px' }} >Upload image</span></Button>
                        </Upload>
                    </Col>
                </Row>
            </Modal>  
        </>
    )
}

export default BtnExcelCusStay