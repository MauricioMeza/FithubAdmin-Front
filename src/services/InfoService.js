import Axios from "axios";
import AuthService from "./AuthService";

var token = ""
if(AuthService.getCurrentUser() != null){
  token = AuthService.getCurrentUser().Authorization
}

const API_URL = "http://localhost:8080/"
const API_URL_User = "http://localhost:8080/User/"

class InfoService {
  
    getInstructoresList(){
      var InstListFront = [

      ];
      //return Axios.get( API_URL +"buscarTodosInstructores").then(response => { meter todo lo de abajo aca })
      let InstListBack = [
        {"nombre":"Ivan"
        ,"correo":"ivan@Fithub.com",
        "image": 'https://source.unsplash.com/7kEpUPB8vNk'},

        {"nombre":"Carolina"
        ,"correo":"carolina@Fithub.com",
        "image": 'https://source.unsplash.com/rZmCg1_QOYQ'},

        {"nombre":"Daniela"
        ,"correo":"daniela@Fithub.com",
        "image":'https://source.unsplash.com/YA-9Ut5B03M'},
      ];
      


      InstListBack.map((inst) => {
        let descripcion = inst.nombre + " Es un entrenador con años de experiencia y dedicado en su compromiso a que mejores tu salud"
        let planFront = {title: inst.nombre, date: inst.correo, description: descripcion,image: inst.image, imageText: 'Ver horarios'}
        InstListFront.push(planFront)
      })
      
      return InstListFront
    
    }

    getPlanesList(){
      return Axios.get( API_URL +"listaTipoPlanes")  
    }

    getUserInfo(){
      let user = AuthService.getCurrentUser()
      return Axios.get(API_URL_User + "getInfoUsuario/" + user.Mail, {headers:{"Authorization": token}})
    }

}export default new InfoService();