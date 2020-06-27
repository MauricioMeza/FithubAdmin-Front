import Axios from "axios";
import AuthService from "./AuthService";

var token = ""
if(AuthService.getCurrentUser() != null){
  token = AuthService.getCurrentUser().Authorization
}

const API_URL = "http://localhost:8080/"
const API_URL_User = "http://localhost:8080/User/"

class InfoService {

    getPlanesList(){
      return Axios.get(API_URL +"listaTipoPlanes")  
    }

    reservarPlan(planId){
      let user = AuthService.getCurrentUser()
      return Axios.get(API_URL_User + "reservarPlan/" + user.Mail + "/" + planId, {headers:{"Authorization": token}})
    }

}export default new InfoService();