import React from "react";

import PlanService from "../services/PlanService";
import ClaseService from "../services/ClaseService";

import InfoService from "../services/InfoService";

import ClassData from "./ClassData";


import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {Inject, ScheduleComponent, Day, Week, Month, ViewsDirective, ViewDirective} from "@syncfusion/ej2-react-schedule";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { withStyles } from '@material-ui/core/styles';

import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from "./FeaturedPost";
import Pricing from "./Pricing";


const useStyles = theme => ({
    root: {
       flexGrow: 1,
     },
     footer: {
      padding: theme.spacing(3, 2),
      marginTop: 'auto',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
    });

const mainFeaturedPost = {
    title: 'Bienvenido a Fithub',
    description:
      "Somos el gimnasio numero 1 para que entrenes con las últimas tendencias del Fitness mundial",
    title2: 'Registrate y obten una clase de prueba Gratis',
    title3: 'Si ya eres miembro Inicia Sesion y reserva tus clases',
    
    image: 'https://source.unsplash.com/FodEsaNZs48',
    imgText: 'main image description',
    linkText: 'Ver planes',
};

class Welcome extends React.Component{
  constructor(props){
      super(props)
      this.state = {planes: [], instructores: [], clases:[]}
  }

  componentDidMount(){
    //Traer Info de la lista de Planes
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

    //Traer Info de la lista de Clases 
      ClaseService.getClases()
      .then(response => {
        this.setState({
          clases : response.data 
        })
      })
      
    //Traer Info de la lista de Instructores
      this.setState({
          instructores: InfoService.getInstructoresList()
      }) 
  }   
  
  // Funciones de Configuracion SCHEDULER
  onPopupOpen(args) {
    console.log(args)
      if(args.type != "QuickInfo" || !args.data.Id){
        args.cancel = true
      }
  }

  content(props) {
    this.render()
    return (
      <div className="e-subject-wrap">
           {(props.Instructor !== undefined) ? <div className="subject">{"Instructor: " + props.Instructor}</div> : ""}
           {(props.Duracion !== undefined) ? <div className="duracion">{"Duracion: " + props.Duracion}</div> : ""}
           {(props.Cupos !== undefined) ? <div className="cupos">{"Cupos: " + props.Cupos}</div> : ""}
        </div>
    );
  }
    

  render(){
      const { classes } = this.props;
      const {planes, instructores, clases} = this.state
      return(
          <Container maxwidth="xl">

              <MainFeaturedPost post={mainFeaturedPost} />

              <br></br>
              <br></br>
              <br></br>

              <Typography variant="h4" align="center" gutterBottom>
              {"Conoce a nuestros entrenadores"}
              </Typography>
              
              <Divider variant="middle" />
              
              <Container maxWidth="lg">
              <Grid container spacing={4}>
              {instructores.map((ins) => (
              <FeaturedPost key={ins.title} post={ins} />
              ))}
              </Grid>
              
              <br></br>
              <br></br>
              <br></br>
              <br></br>

              <Typography variant="h4" align="center" gutterBottom>
              {"Descubre nuestros planes"}
              </Typography >
              </Container>
              <Divider variant="middle" />

              <Container maxwidth="md" component="main">
              <Grid container maxwidth="md" spacing={5} alignItems="flex-start" justify="center">
                {planes.map((plan, i) => (
                  <Pricing tier={plan} key={i} />
                ))}
              </Grid>
              </Container>
              
              <br></br>
              <br></br>
              <br></br>
              <br></br>

              <Typography variant="h4" align="center" gutterBottom>
              {"Conoce nuestras clases"}
              </Typography >
              <Divider variant="middle" />

              <Container maxwidth="md" component="main">
                <Carousel>
                  <div>
                    <img src='https://source.unsplash.com/3RnkZpDqsEI' />
                    <p className="legend">Streching</p>
                  </div>
                  <div>
                    <img src='https://source.unsplash.com/gJtDg6WfMlQ' />
                    <p className="legend">Yoga</p>
                  </div>
                  <div>
                    <img src='https://source.unsplash.com/y0SMHt74yqc' />
                    <p className="legend">Body Combat</p>
                  </div>
                </Carousel>
              </Container>

              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <Typography variant="h4" align="center" gutterBottom>
              {"Nuestro Horario de Sesiones"}
              </Typography >
              <Divider variant="middle" />

              <Container maxwidth="md" component="main">
              <ScheduleComponent eventSettings={{dataSource: ClassData.getClassData(clases)}}
                popupOpen={this.onPopupOpen.bind(this)} currentView='Week'
                startHour='05:00' endHour='22:00' quickInfoTemplates={{content: this.content.bind(this)}} locale='es-CO'>
                <ViewsDirective>
                  <ViewDirective option='Day'/>
                  <ViewDirective option='Week'/>
                  <ViewDirective option='Month'/>
                </ViewsDirective>
                <Inject services = {[Day, Week, Month]}/>
              </ScheduleComponent>
              </Container>

        </Container>
      )
  }
}

export default withStyles(useStyles)(Welcome);