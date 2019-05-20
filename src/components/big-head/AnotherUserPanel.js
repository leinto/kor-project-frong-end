import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import { NavLink } from 'react-router-dom'

import './UserPanel.css';

class AnotherUserPanel extends Component {
    render() {

        return (
            <div>
                <NavLink to="/login"><Button variant="secondary">Icon</Button></NavLink>
            </div>
        )
    }
}


export default AnotherUserPanel;