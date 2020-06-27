import React, {Component} from "react"; 
import PropTypes from "prop-types";

import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import ClaseService from "../../services/ClaseService";
import AuthService from "../../services/AuthService";

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  infoText: {
    width: "100%"
  },
  infoContainer: {
    width: "100%"
  }
});


class ClassT extends Component{
  constructor(props){
    super(props);
    this.deleteClase = this.deleteClase.bind(this)
  }

  deleteClase(i){
    let user = AuthService.getCurrentUserRole()

    if(user == "ADMIN"){
      ClaseService.deleteSesion(i)
      .then(response => {
        this.props.reload()
      })
      .catch(error => {
        alert(error.response.data)
      })
    }else if(user == "USER"){
      ClaseService.cancelClase(i)
      .then(response => {
        this.props.reload()
      })
      .catch(error => {
        alert(error.response.data)
      })  
    }
  }
    
  render(){
    const {clas, classes} = this.props;
    return(
      <Grid item xs={12} md={6} className = {classes.infoContainer} >
        <div>
          <List>
            <ListItem>
              <ListItemIcon>
                <CalendarIcon />
              </ListItemIcon>
              <ListItemText className = {classes.infoText}
                primary= {clas.fecha + "-"+ clas.hora + " | " + clas.tipo.nombre + " | " + clas.cupos + "/" + clas.tipo.cupos }
                secondary = {clas.instructor}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" size="medium" onClick={(e) => {this.deleteClase(clas.id)}}>
                <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </div>
      </Grid>
     )
}

}

ClassT.propTypes ={
  clas: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  reload: PropTypes.func.isRequired
}

export default withStyles(styles)(ClassT);