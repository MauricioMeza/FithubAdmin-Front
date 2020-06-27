import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import AuthService from "../../services/AuthService";
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Jumbotron } from "react-bootstrap";

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


class WelcomeUser extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            currentUser : AuthService.getCurrentUser()
        };
    }

    componentDidMount(){
        console.log(this.state.currentUser)
    }

    render(){
        const {currentUser} = this.state;
        const { classes } = this.props;
        return(
            <Container maxWidth="lg">
                <Jumbotron className = "bg-dark text-white">
                  <h1 className="text-center">¡Bienvenido a FitHub-User {currentUser.User}!</h1>
                  <br></br>
                  <h2 className="text-center">Esta es la Pagina Principal para que los usuarios puedan Reservar y manejar sus Planes y Clases</h2>
                </Jumbotron>
                <Container fixed={true}  disableGutters={true} component="main">
                <br></br>
                <Typography variant="h4" align="center" gutterBottom>
                {"Conoce todos los beneficios que FitHub te ofrece"}
                </Typography >
                <Divider variant="middle" />
                <br></br>
                <Typography variant="h5" align="center" gutterBottom>
                {"Disfruta todo lo que tenemos para ti por ser parte del mejor gimnasio de Colombia"}
                </Typography >
                <Divider variant="middle" />
                <Divider variant="middle" />
                  <Carousel>
                    <div>
                      <img src='https://source.unsplash.com/m27OTMegUyA' />
                      <p className="legend">Zona aerobicos</p>
                    </div>
                    <div>
                      <img src='https://source.unsplash.com/CQfNt66ttZM' />
                      <p className="legend">Zona de pesas</p>
                    </div>
                    <div>
                      <img src='https://source.unsplash.com/3RnkZpDqsEI' />
                      <p className="legend">Clases grupales </p>
                    </div>
                    <div>
                      <img src='https://source.unsplash.com/R0y_bEUjiOM' />
                      <p className="legend">Entrenamiento personalizado </p>
                    </div>
                  </Carousel>
                </Container>
                <br></br>
            
          </Container>
        )
    }
}

export default withStyles(useStyles)(WelcomeUser);