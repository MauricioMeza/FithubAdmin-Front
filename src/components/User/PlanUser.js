import React from "react";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

import InfoService from "../../services/InfoService";
import PlanService from "../../services/PlanService";

import Pricing from "../Pricing";


const useStyles = theme => ({
    root: {
        minWidth: 275,
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      cardHeader: {
        fontSize: 14,
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
      },
  });

class PlanUser extends React.Component{
  constructor (props) {
    super(props)

    this.state = {
      planInfo: [],
      infoShow: {datePlanI:"", datePlanF:"", daysDiff:"" , clasDiff:""},
      planUser: {},
      user: {}

    };

    this.getUserInfo = this.getUserInfo.bind(this)
  }

  getUserInfo(){
    InfoService.getUserInfo()
      .then(response => {
        this.setState({
          user: response.data,
          planUser: response.data.planDTO,
        })
        let fechaI = new Date(this.state.planUser.fechaInicio)
        let fechaF = new Date(this.state.planUser.fechaFin)
        let fechaN = new Date()
        let fechaDiff = ((fechaF - fechaN))/(1000 * 60 * 60 * 24)
        let clasDiff = this.state.planUser.tipo.cantSesiones - (this.state.planUser.sesionAsistida + this.state.planUser.sesionReservada) 
        this.setState({
          infoShow: {datePlanI:this.formatDate(fechaI), datePlanF:this.formatDate(fechaF), 
                      daysDiff:Math.ceil(fechaDiff), clasDiff:clasDiff}
        })
      })
  }
  componentDidMount(){
    this.getUserInfo()

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
          planInfo: planListFront
        })
      })
 
  }

  formatDate(fecha){
    let months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];
    var horaMin = fecha.getMinutes()
    if(horaMin == "0") horaMin = "00"
    let fechaS = fecha.getDate() + "/" + months[fecha.getMonth()] + "/" + fecha.getFullYear();
    let fechaH = fecha.getHours() + ":" + horaMin;
    
    return fechaS + "  -  " + fechaH;

  }

  render(){
    const {classes} = this.props;
    const {user, planUser, infoShow, planInfo} = this.state;

    var planComprar = <Typography variant="body2" variant="subtitle1" align="center" component="p"> Tu Plan Todavia Esta Activo </Typography>;
    if(!planUser.activo){
      planComprar = 
      <Container>
        <Typography variant="body2" variant="subtitle1" align="center" component="p"> Tu Plan Ha caducado </Typography>
        <Typography variant="body2" variant="body2" align="center" component="p"> Adquiere un Nuevo Plan </Typography>
        <Grid container maxwidth="md" spacing={5} alignItems="flex-start" justify="center">
          {planInfo.map((plan, i) => (
            <Pricing tier={plan} key={i} reloadInfo={this.getUserInfo} />
          ))}
        </Grid>
      </Container>
    }

    return (
      <div>
        <Container maxWidth="md" component="main">
        <Card className={classes.root}>
            <CardHeader
                title="Mi plan actual"
                subheader= {(user.planDTO != undefined) ? user.nombre : undefined}
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                className={classes.cardHeader}
            />
            <CardContent>
              <Typography className={classes.pos} variant="h5" color="textPrimary">
                Mi plan actual es : {(user.planDTO != undefined) ? planUser.tipo.nombre : "undefined"} 
              </Typography>
              <Typography variant="body2" variant="subtitle1" component="p">
                Fecha de inicio:  {(user.planDTO != undefined) ? infoShow.datePlanI : "undefined"}
              <br />
                Fecha final: {(user.planDTO != undefined) ? infoShow.datePlanF : "undefined"}
              </Typography>

              <Progress percent={(user.planDTO != undefined) ? ((infoShow.daysDiff / planUser.tipo.cantDias)*100).toFixed(1) : undefined} status="active" />
              
              <Typography variant="body2" align="center" variant="body2" component="p">
                Te quedan {(user.planDTO != undefined) ? infoShow.daysDiff : "undefined"} dias 
              </Typography>
              <Typography variant="body2" variant="subtitle1" component="p">
                Clases iniciales: {(user.planDTO != undefined) ? planUser.tipo.cantSesiones: undefined} clases
              <br />
                Clases atendidas: {(user.planDTO != undefined) ? planUser.sesionAsistida : undefined} clases
              <br/>
                Clases reservadas: {(user.planDTO != undefined) ? planUser.sesionReservada : undefined} clases
              </Typography>
              <Progress percent={(user.planDTO != undefined) ? (infoShow.clasDiff/planUser.tipo.cantSesiones)*100 : undefined} status="active" />
              <Typography variant="body2" align="center" variant="body2" component="p">
                Te quedan {infoShow.clasDiff} clases 
              </Typography>
            </CardContent>
          </Card>
        </Container>
        {planComprar} 
      </div>  
    )
  }
}

export default withStyles(useStyles)(PlanUser);