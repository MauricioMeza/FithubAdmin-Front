import React, {Component} from "react";
import PropTypes from 'prop-types';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
//import addDays from 'date-fns/addDays'
 
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import ClaseService from "../../services/ClaseService";
import Classes from "./Classes";
//import Class from "./ClassT";

import {Inject, ScheduleComponent, Day, Week, Month, ViewsDirective, ViewDirective} from "@syncfusion/ej2-react-schedule";
import {extend, L10n, loadCldr} from '@syncfusion/ej2-base';
import {DropDownListComponent} from "@syncfusion/ej2-react-dropdowns";
import {DateTimePickerComponent} from "@syncfusion/ej2-react-calendars";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

import ClassData from "./ClassData";

L10n.load({'es-CO': {
  'schedule': {
      "today": "Hoy",
      "day": "Día",
      "week": "Semana",
      "month": "Mes",
      'saveButton': 'Guardar',
      'cancelButton': 'Cerrar',
      'deleteButton': 'Eliminar',
      'newEvent': 'Evento',
    },
  }
});

loadCldr(
  require('cldr-data/supplemental/numberingSystems.json'),
  require('cldr-data/main/es-CO/ca-gregorian.json'),
  require('cldr-data/main/es-CO/numbers.json'),
  require('cldr-data/main/es-CO/timeZoneNames.json')
);

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

class ClassForm extends React.Component{

  constructor (props) {
    super(props)
    this.data = extend([], null, null, true);

    this.state = {
      instructores : [], 
      clases : [],
      clasesBD : [],
      clasesHorario : [],
      startDate: new Date(),
      endDate: new Date(),
      type: "",
      instructor: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.reloadClases = this.reloadClases.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);     
  }

  componentDidMount(){
    ClaseService.getInstNombres()
    .then(response => {
      this.setState({
        instructores : response.data, 
      })
    })
    .catch(error => {
      console.log(error)
    })
    
    ClaseService.getClasesNombres()
    .then(response =>{
      var clasNomList = []
      response.data.forEach( clas => {
        clasNomList.push(clas.nombre) 
      })
      this.setState({
        clases : clasNomList, 
      })
    })
    .catch(error => {
      console.log(error)
    })
    
    this.reloadClases()
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name] : event.target.value
    })
  }
  handleDateChange(date) {
    this.setState({
      startDate : date
    })
  }

  reloadClases(){
    ClaseService.getClasesAdmin()
    .then(response => {
      var clas = response.data.map((c, i) => {
        var fechaActual = new Date()
        var fecha = new Date(c.fecha)
        var actual = true;
        if(fecha.getTime() < fechaActual.getTime()){actual = false}
        var months = ["Ene/", "Feb/", "Mar/", "Abr/", "May/", "Jun/", "Jul/", "Ago/", "Sep/", "Oct/", "Nov/", "Dec/"];
        var horaMin = fecha.getMinutes()
        if(horaMin == 0) horaMin = "00"
        return {
          "fecha" : " " + months[fecha.getMonth()] + fecha.getDate() + " ",
          "hora" : " " + fecha.getHours() + ":" + horaMin + " ",
          "tipo" : c.tipo,
          "instructor": " " + c.instructor + " ",
          "id": c.id,
          "cupos": c.cupos,
          "duracion": c.duracion,
          "actual": actual
        }
        
      })
      this.setState({
        clasesBD : clas,
        clasesHorario: response.data
      })
    })
    .catch(error => {
      console.log(error)
    })    
  }

  // Funcion que recibe el Submit del Formulario
  onFormSubmit(e) {
    e.preventDefault();
    console.log(this.state.type)
    ClaseService.addClase(this.state.startDate, this.state.type, this.state.instructor)
    .then(response => {
      console.log(response)
      this.reloadClases()
    })
    .catch(error => {
      const e = error.response.data;
        if(e.errors){
          alert(e.errors[0].defaultMessage) 
        }else{
          alert(e) 
        }
      console.log(error.response.data)
    })
  }

  // Funciones Modificadores del Scheduler
  onPopupOpen(args) {
    if(args.data.Id){
      if(args.type == "DeleteAlert"){
        args.cancel = true
        ClaseService.deleteSesion(args.data.Id)
          .then(response => {
            this.reloadClases();  
          })
          .catch(error => {
            const e = error.response.data;
            if(e.errors){
              alert(e.errors[0].defaultMessage) 
            }else{
              alert(e) 
            }
          })
      }
    }else{
      args.cancel = false
    }
  }
  onActionBegin(args) {
    if(args.requestType === "eventChange"){  
      args.cancel = true
      ClaseService.updateClase(args.data)
        .then(response => {
          console.log(response)
          this.reloadClases()
        })
        .catch(error => {
          const e = error.response.data;
          if(e.errors){
            alert(e.errors[0].defaultMessage) 
          }else{
            alert(e) 
          }
        })
      console.log(args)
    }else if(args.requestType === "eventCreate"){
      args.cancel = true
      let clase = args.data[0];
      console.log(clase)
      ClaseService.addClase(clase.StartTime, clase.Subject, clase.Instructor)
        .then(response => {
          this.reloadClases()
        })
        .catch(error => {
          const e = error.response.data;
          if(e.errors){
            alert(e.errors[0].defaultMessage) 
          }else{
            alert(e) 
          }
        })
    }
  }
  content(props) {
    if (props.elementType === 'cell') {
      return(<div className="e-cell-content e-template">
        <form className="e-schedule-form">
          <div>
            <DropDownListComponent id="Subject" placeholder='Clase' data-name="Subject" className="e-field" style={{ width: '100%' }} dataSource={this.state.clases} value={props.Subject|| null}></DropDownListComponent>
          </div>
          <div>
            <DropDownListComponent id="Instructor" placeholder='Elija un profesor' data-name="Instructor" className="e-field" style={{ width: '100%' }} dataSource={this.state.instructores} value={props.Instructor || null}></DropDownListComponent>
          </div>
        </form>  
      </div>)
    } else {
      return(<div className="e-event-content e-template">
      <div className="e-subject-wrap">
          {(props.Instructor !== undefined) ? <div className="subject">Instructor: {props.Instructor}</div> : ""}
          {(props.Duracion !== undefined) ? <div className="duracion">Duracion: {props.Duracion}</div> : ""}
          {(props.Cupos !== undefined) ? <div className="duracion">Cupos: {props.Cupos}</div> : ""}
      </div>
    </div>)
    }
  }
  footer(props) {
    if (props.elementType === 'cell') {
      return(<div className="e-cell-footer">
          <button className="e-event-create" title="Agregar">Agregar</button>
        </div>
      );
    } else {
      return(<div className="e-event-footer">
          <button className="e-event-edit" title="Editar">Editar</button>
          <button className="e-event-delete" title="Eliminar">Eliminar</button>
        </div>
      );
    }
  }
  editorWindowTemplate(props){
    if(props !== undefined) {
      return(<table className="custom-event-editor" style={{ width: '100%', cellpadding: '5' }}><tbody>
        <tr><td className="e-textlabel">Clase</td><td colSpan={4}>
          <DropDownListComponent id="Subject" placeholder='Clase' data-name="Subject" className="e-field" style={{ width: '100%' }} dataSource={this.state.clases} value={props.Subject|| null}></DropDownListComponent>
        </td></tr>
        <tr><td className="e-textlabel">Inicio</td><td colSpan={4}>
          <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="StartTime" data-name="StartTime" value={new Date(props.startTime || props.StartTime)} className="e-field"></DateTimePickerComponent>
        </td></tr>
        <tr><td className="e-textlabel">Instructor</td><td colSpan={4}>
          <DropDownListComponent id="Instructor" placeholder='Elija un profesor' data-name="Instructor" className="e-field" style={{ width: '100%' }} dataSource={this.state.instructores} value={props.Instructor || null}></DropDownListComponent>
        </td></tr>
      </tbody></table>)
    } else {
      return(<div></div>)
    }
  }

  render() {  
    const {classes} = this.props;
    const {instructores, clases, clasesBD, clasesHorario} = this.state;

    return(
      <React.Fragment>
        <Container className={classes.containerC} component="main" maxWidth="xl">
          <Grid container 
                  spacing={3} 
                  direction = "column" 
                  display="flex" 
                  alignItems="center" 
                  justify="center">
            <Typography component="h1" variant="h5">
                Clases Creadas
            </Typography>
            <br></br>
            <Classes classes={clasesBD} reload ={this.reloadClases}></Classes>
          </Grid>
        </Container>
      
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Agregar clase
            </Typography>
              <form className={classes.form} onSubmit={ this.onFormSubmit }>
                <Grid container 
                  spacing={3} 
                  direction = "column" 
                  display="flex" 
                  alignItems="stretch" 
                  justify="center">

                  <Grid item xs={12} className={classes.dateControl}>
                    <DatePicker
                        selected={ this.state.startDate }
                        onChange={ this.handleDateChange }
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        timeCaption="Hora"
                        dateFormat="yyyy/MM/dd h:mm aa"
                        name = "startDate"
                      />
                    <FormHelperText>Seleccione Fecha y Hora</FormHelperText>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel>Tipo de clase</InputLabel>
                      <Select
                        required
                        name = "type"
                        onChange = {this.handleChange}
                        selected = {this.state.type}
                        value = {this.state.type}
                      >
                        {clases.map((clase, i) =>
                          <MenuItem value={clase} key={i}>{clase}</MenuItem>
                        )}
                        
                      </Select>
                      <FormHelperText>Seleccione un tipo de clase</FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>  
                    <FormControl className={classes.formControl}>
                      <InputLabel>Instructor</InputLabel>
                      <Select
                        required
                        name = "instructor"
                        onChange = {this.handleChange}
                        selected = {this.state.instructor}
                        value = {this.state.instructor}
                      >
                        {instructores.map((instructor, i) =>
                          <MenuItem value={instructor} key={i}>{instructor}</MenuItem>
                        )}
                        
                      </Select>
                      <FormHelperText>Seleccione un Instructor</FormHelperText> 
                    </FormControl>                
                  </Grid>

                </Grid>

                <Button
                  className={classes.submit}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                > Añadir clase
                </Button>
              </form>
          </div>
        </Container>

        <Container className={classes.containerCalendar} component="main" maxWidth="md">
          <Grid container 
                  spacing={3} 
                  direction = "column" 
                  display="flex" 
                  alignItems="center" 
                  justify="center">
            <Typography component="h1" variant="h5">
                Horario de Clases
            </Typography>
            <br></br>
            
            <ScheduleComponent ref={t => this.scheduleObj = t} currentView='Week' actionBegin={this.onActionBegin.bind(this)}
            eventSettings={{dataSource: ClassData.getClassData(clasesHorario)}} startHour='05:00' endHour='22:00'
            editorTemplate={this.editorWindowTemplate.bind(this)} popupOpen={this.onPopupOpen.bind(this)}
            quickInfoTemplates={{content: this.content.bind(this), footer: this.footer.bind(this)}} locale='es-CO'> 
              <ViewsDirective>
                <ViewDirective option='Day'/>
                <ViewDirective option='Week'/>
                <ViewDirective option='Month'/>
              </ViewsDirective>
              <Inject services = {[Day, Week, Month]}/>
            </ScheduleComponent>
          </Grid>
        </Container>

      </React.Fragment>
    );
  }
}

ClassForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClassForm);