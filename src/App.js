import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import {Row, Col} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Container} from '@material-ui/core';

import ProtectedRouteAdmin from "./components/RouteComponents/ProtectedRouteAdmin"
import ProtectedRouteUser from "./components/RouteComponents/ProtectedRouteUser"
import MainRoute from "./components/RouteComponents/MainRoute"


//importar componentes

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import NavigationBar from "./components/NavigationBar";
import FooterPage from "./components/FooterPage";


import WelcomeAdmin from "./components/Admin/WelcomeAdmin";
import ClassForm from "./components/Admin/ClassForm";
import ClasTypeForm from "./components/Admin/ClassTypeForm";
import PlanForm from "./components/Admin/PlanForm";
import classes from "./sample/classes.json";

import WelcomeUser from "./components/User/WelcomeUser";
import ClassUser from "./components/User/ClassUser";
import PlanUser from "./components/User/PlanUser";

class App extends Component{

  state = {
    classes: classes
  }

  addClass = (startDate, type) => {
    const newClass = {
      id: this.state.classes.length,
      startDate: startDate,
      type: type
    }
    this.setState({
      classes: [...this.state.classes, newClass]
    })
  }
  
  render(){
    return(

    <Router>
      <NavigationBar/>
      <Container>
        <Row>
          <Col lg={12} >
            <Switch>
              <MainRoute exact path={"/"}  component={Welcome} />
              <Route exact path="/registro"  component={SignUp} />
              <Route exact path="/login"  component={Login} />
              
              <ProtectedRouteAdmin exact path="/welcomeAdmin"  component={WelcomeAdmin} />
              <ProtectedRouteAdmin exact path="/ClassForm"  component={ClassForm} />
              <ProtectedRouteAdmin exact path="/PlanForm"  component={PlanForm} />
              <ProtectedRouteAdmin exact path="/ClasTypeForm"  component={ClasTypeForm} />

              <ProtectedRouteUser exact path="/welcomeUser"  component={WelcomeUser} />
              <ProtectedRouteUser exact path="/ClassUser"  component={ClassUser} />
              <ProtectedRouteUser exact path="/PlanUser" component={PlanUser} />
            </Switch>
          </Col>
        </Row>
      </Container>
      <FooterPage/>
    </Router>
    )
  }
}

export default App;
