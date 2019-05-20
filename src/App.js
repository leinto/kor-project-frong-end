import React, { Component } from 'react';
import { Route, Router, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import history from "./utilities/history";
import PrivateRoute from './components/PrivateRoute';
import HomePage from "./containers/HomePage/HomePage";
import ProjectPage from "./containers/ProjectPage/ProjectPage";
import FormulaPage from "./containers/FormulaPage/FormulaPage";
import SurveyPage from "./containers/SurveyPage/SurveyPage";
import SignupPage from "./containers/SignupPage/SignupPage";
import alertActions from './actions/alertActions';
import LoginPage from './containers/LoginPage/LoginPage';
import "./components/nav-bar/NavBar.css";
import BigHead from "./components/big-head/BigHead";
import { Row, Col } from 'react-bootstrap';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';



class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  state = {
    sideShow: false, 
    sideSize: 0, 
    buttonSize: 1,
    contentSize: 11
  }
  handleClick = () => {
    const sideSwitch = this.state.sideShow
    this.setState({ sideShow: !sideSwitch })
    if (sideSwitch === true) {
      this.setState({
        sideSize: 0, 
        buttonSize: 1,
        contentSize: 11
      })
    } else {
      this.setState({
        sideSize: 2, 
        buttonSize: 1,
        contentSize: 9
      })
    }
  }
  render() {
    const { alert } = this.props;

    return (
      <Router history={history}>
        <BigHead />
        <Row>
          {this.state.sideShow ? <Col sm={this.state.sideSize} className="side-bar">
            <nav>
              <ul className="nav-list">
                <NavLink to="/" className="side-link">Resource</NavLink><br />
                <NavLink to="/project" className="side-link">Project</NavLink><br />
                <NavLink to="/formula" className="side-link">Formula</NavLink><br />
              </ul>
            </nav>
          </Col> : null}
          <Col sm={this.state.buttonSize} className="side-bar-button">
            <button className="customize-button" onClick={this.handleClick}>
              {this.state.sideShow ? <IoIosArrowBack /> : <IoIosArrowForward />}
              </button></Col>
          <Col sm={this.state.contentSize}>
            <div>
              <PrivateRoute exact path="/" component={HomePage} />
              <PrivateRoute exact path="/project" component={ProjectPage} />
              <PrivateRoute exact path="/formula" component={FormulaPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/signup" component={SignupPage} />
              <Route exact path="/survey" component={SurveyPage} />
            </div>
            {alert.message &&
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
          </Col>
        </Row>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

export default connect(mapStateToProps)(App);
