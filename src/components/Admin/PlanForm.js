import React, {Component} from "react";
import PropTypes from 'prop-types';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
 
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import {withStyles} from '@material-ui/core/styles';

import ModService from "../../services/ModificarService";
import PlanService from "../../services/PlanService";

import Pricing from "../Pricing";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    width: "100%"
  },
  dateControl: {
    width: "100%"
  },
  containerC: {
    padding: theme.spacing(3, 0, 1)
  },
  containerCalendar: {
    padding: theme.spacing(10, 0, 10)
  },
});

class PlanForm extends React.Component{

  constructor (props) {
    super(props)

    this.state = {
      nombre: "",
      cantDias: 0,
      cantSesiones: 0,
      precio: 0,
      planes: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);    
    
    }

  componentDidMount(){
    this.reloadPlanInfo()
  }

  reloadPlanInfo(){
    PlanService.getPlanesList()
    .then(response => {
      const PlanListBack = response.data;
      var planListFront = [];

      PlanListBack.map((plan) => {
        let descripcion = [plan.cantSesiones + " Clases Incluidas", plan.cantDias + " Dias de Duracion"]
        let planFront = {id: plan.id, title: plan.nombre, price: plan.precio, description: descripcion, buttonText: "Adquirir " + plan.nombre}
        planListFront.push(planFront)
      })

      this.setState({
        planes: planListFront
      })
    })
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  onFormSubmit(e){
    e.preventDefault();
    const plan = this.state
    ModService.addTipoPlan(plan.nombre, plan.cantDias, plan.cantSesiones, plan.precio)
      .then(response => {
        this.reloadPlanInfo()
      })
      .catch(error => {
        console.log(error.response)
      })
  }


  render(){ 
    const {classes} = this.props;
    const {planes} = this.state;

    return(
      <React.Fragment>
        <Container component="main" maxWidth="xl">
          <Grid container maxwidth="md" spacing={5} alignItems="flex-start" justify="center">
                {planes.map((plan, i) => (
                  <Pricing tier={plan} key={i} />
                ))}
          </Grid>
        </Container>

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
          <Grid container 
                  spacing={3} 
                  direction = "column" 
                  display="flex" 
                  alignItems="center" 
                  justify="center">
          <Typography component="h1" variant="h5">
                Agregar Nuevo Tipo de Plan
          </Typography>
          </Grid>

          <form className={classes.form} onSubmit={this.onFormSubmit}>
            <Grid container 
              spacing={3} 
              direction = "column" 
              display="flex" 
              alignItems="center" 
              justify="center">
              
              <Grid item xs={12} >
                <TextField 
                  required
                  name="nombre" 
                  id="plan-type" 
                  label="Nombre Tipo de Plan" 
                  onChange={this.handleChange} 
                  value={this.state.nombre}/>
              </Grid>
              <Grid item xs={12} >
                <TextField 
                  required
                  name="cantDias"
                  id="num-days" 
                  label="Cantidad de días"
                  onChange={this.handleChange} 
                  value={this.state.cantDias} />
              </Grid>
              <Grid item xs={12} >
                <TextField 
                  required
                  name="cantSesiones"
                  id="num-sessions" 
                  label="Cantidad de sesiones"
                  onChange={this.handleChange} 
                  value={this.state.cantSesiones} />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  name="precio" 
                  id="num-sessions" 
                  label="Precio"
                  onChange={this.handleChange} 
                  value={this.state.precio} />
              </Grid>

            </Grid>

            <Button
              className={classes.submit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            > Añadir tipo de plan
            </Button>
            </form>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

PlanForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlanForm);