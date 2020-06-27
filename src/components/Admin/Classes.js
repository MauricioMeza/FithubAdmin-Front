import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import Class from './ClassT';

class Classes extends Component{
    constructor(props) {
        super(props)
    }

    render(){
        if(this.props.classes.length === 0){
            return (
                <Typography component="h1" variant="body2"> No hay clases registradas</Typography>
            )
        }
        else{
            return (
                this.props.classes.map((clas, i) => {
                    if(clas.actual){
                        return(<Class clas ={clas} reload={this.props.reload} key={i}/>)
                    }})
            )
        }
    }
}

Classes.propTypes ={
    classes: PropTypes.array.isRequired,
    reload: PropTypes.func.isRequired
}

export default Classes;