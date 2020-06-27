import Axios from "axios";
import AuthService from "./AuthService";

var token = ""
if(AuthService.getCurrentUser() != null){
  token = AuthService.getCurrentUser().Authorization
}

const API_URL = "http://localhost:8080/"
const API_URL_Admin = API_URL + "Admin/";
const API_URL_User = API_URL + "User/";

class ModificarService {

    // CRUD TipoSesion----------------------
    addTipoSesion(nom, cup, dur) {
        const tipoSesion = JSON.stringify({
            nombre: nom,
            cupos: cup,
            duracion: dur,
        })

        return Axios.post( API_URL_Admin + "agregarTipoSesion", tipoSesion, 
        {headers:{"Content-Type" : "application/json",
                    "Authorization": token
                    }})
    }

    deleteTipoSesion(nom){
        return Axios.delete(API_URL_Admin + "eliminarTipoSesion", {headers:{"Authorization": token}, data: nom})
    }
  

    // CRUD Plan ----------------------------
    addTipoPlan(nom, dias, sesiones, precio) {
        const tipoPlan = JSON.stringify({
            nombre: nom,
            cantDias: dias,
            cantSesiones: sesiones,
            precio: precio
        })

        return Axios.post( API_URL_Admin + "crearTipoPlan", tipoPlan, 
        {headers:{"Content-Type" : "application/json",
                    "Authorization": token
                    }})
    }

    deleteTipoPlan(nom) {
        return Axios.delete( API_URL_Admin + "eliminarTipoPlan", {headers:{"Authorization": token}, data: nom})
    }
}

export default new ModificarService();