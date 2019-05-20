import React from 'react'
import UserPanel from './UserPanel'
import { Row, Col } from "react-bootstrap";

import './BigHead.css'


export default function BigHead() {
    return (
        <Row className="big-head">
            <Col sm={3} className="big-head-title">
                <div className="big-head-title-text">Resources Management</div>
            </Col>
            <Col sm={{ span: 3, offset: 6 }}>
                <UserPanel />
            </Col>
        </Row>
    )
}
