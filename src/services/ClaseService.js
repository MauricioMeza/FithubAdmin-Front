import Axios from "axios";
import AuthService from "./AuthService";
 
var token = ""
if(AuthService.getCurrentUser() != null){
  token = AuthService.getCurrentUser().Authorization
}

const API_URL = "http://localhost:8080/"
const API_URL_Admin = API_URL + "Admin/";
const API_URL_User = API_URL + "User/";

class ClaseService {

  // Acciones Administrador----------------------
  addClase(fecha, clase, instructor) {
    const sesion = JSON.stringify({
        fecha: fecha,
        tipoSesion: clase,
        instructor: instructor,
    })
    console.log(sesion)

      return Axios.post( API_URL_Admin + "agregarSesion", sesion, 
      {headers:{"Content-Type" : "application/json",
                "Authorization": token
              }})
  }

  updateClase(sesion){
    console.log(sesion)
    const sesionDTO = JSON.stringify({
      id: sesion.Id,
      fecha: sesion.StartTime,
      instructor: sesion.Instructor,
      cupos: sesion.Cupo,
      tipoSesion: sesion.Subject,
    })
    
    return Axios.put(API_URL_Admin + "actualizarSesion", sesionDTO,
    {headers:{"Content-Type" : "application/json",
              "Authorization": token
             }})
  }

  getClasesAdmin(){
    return Axios.get(API_URL_Admin + "buscarTodasSesiones", {headers:{"Authorization": token}})
  }

  getInstNombres(){
    return Axios.get(API_URL_Admin + "instructoresNombres" , {headers:{"Authorization": token}})
  }
  getClasesNombres(){
    return Axios.get( API_URL_Admin +"buscarTodosTiposSesiones" , {headers:{"Authorization": token}})
  }
  deleteSesion(claseId){
    return Axios.delete(API_URL_Admin + "eliminarSesion", {headers:{"Authorization": token}, data: claseId})
  }
  

  // Acciones Usuario ----------------------------
  getClasesUser(){
    let user = AuthService.getCurrentUser()
    return Axios.get(API_URL_User + "verSesionesReservadas/" + user.Mail , {headers:{"Authorization": token}})
  }
  
  reserveClase(ClaseId){
    let user = AuthService.getCurrentUser()
    return Axios.get(API_URL_User + "reservarCupo/" + user.Mail + "/" + ClaseId , {headers:{"Authorization": token}})
  }

  cancelClase(ClaseId ){
    let user = AuthService.getCurrentUser()
    return Axios.get(API_URL_User + "cancelarCupo/" + user.Mail + "/" + ClaseId , {headers:{"Authorization": token}})
  }

  // Acciones Todos ----------------------------
  getClases(){
    return Axios.get(API_URL + "listaSesiones")
  }
}

export default new ClaseService();