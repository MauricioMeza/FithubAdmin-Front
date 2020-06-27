import Axios from "axios";
import {loginUser, logoutUser } from "../reducers/actions"
import store from '../reducers/store';

const API_URL = "http://localhost:8080/";

class AuthService {

  login(correo, contrasena) {
    const login = JSON.stringify({
        correo: correo,
        contrasena: contrasena,
      })
      
      return Axios.post( API_URL + "login", login, {headers:{"Content-Type" : "application/json"}})
        .then(response => {
          const usuario = response.data
          console.log(usuario)
          localStorage.setItem("user", JSON.stringify(usuario))
          store.dispatch(loginUser(usuario))
        })
  }

  logout() {
    localStorage.removeItem("user");
    store.dispatch(logoutUser())
  }

  register(cedula, nombre, correo, contrasena, contrasenaRep) {
    const usuario = JSON.stringify({
        cedula: cedula,
        nombre: nombre,
        correo: correo,
        contrasena: contrasena,
        contrasenaRep: contrasenaRep
      })      
      
      return Axios.post( API_URL +"registro", usuario, {headers:{"Content-Type" : "application/json"}})
  }

  getCurrentUser() {
    const usuario = localStorage.getItem('user');
    return JSON.parse(usuario);
  }

  getCurrentUserRole(){ 
    const usuario = localStorage.getItem('user');
    if(usuario == null){
      return "NULL"
    }else{
      const usuario = JSON.parse(localStorage.getItem('user'))
      return usuario.Rol
    }          
  }
}


export default new AuthService();