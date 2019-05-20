import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popover, OverlayTrigger } from "react-bootstrap";
import Moment from 'react-moment';
import { Link } from "react-router-dom";
// import { GiCrossbow } from "react-icons/gi";
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle'


import './UserPanel.css';


class UserPanel extends Component {

    render() {
        const user = this.props.user ? this.props.user : { usernmae: null, createDate: null, roles: [] };
        const popover = this.props.user ?
            <div>
                <OverlayTrigger
                    trigger="click"
                    key="bottom"
                    placement="bottom"
                    overlay={
                        <Popover
                            id={`popover-positioned-bottom`}>
                            <div>
                                <div id="popover-username">{user.username}</div>
                                {user.roles.map(role => { return <div key={role.id} id="popover-role">{role.name.slice(5)} since</div> })}
                            </div>
                            <div id="popover-date"><Moment format="MMMM-YYYY">{user.createDate}</Moment></div>
                            <div id="popover-button-container">
                                <button id="left-button">Profile</button>
                                <span id="middle-empty"></span>
                                <button id="right-button"><Link to="/login" id="right-button-content">Sign Out</Link></button>
                            </div>
                        </Popover>
                    }>
                    <IconButton className="icon-container"><AccountCircle id="user-icon"/></IconButton>
                </OverlayTrigger>
                <span id="user-info">{user.username}</span>
            </div>
            :
            <IconButton><AccountCircle /></IconButton>
        return (
            <>
                {popover}
            </>
        )
    }
}

function mapStateToProps(state) {
    if (state.auth && state.auth.user) {
        const { user } = state.auth.user;
        return {
            user
        };
    }
    else {
        return {
            user: null
        }
    }
}

export default connect(mapStateToProps)(UserPanel);