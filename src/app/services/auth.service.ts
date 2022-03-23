import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { base_url } from 'src/environments/environment';
import { LoadingController } from '@ionic/angular';

var headers_object = new HttpHeaders();
headers_object.append('Content-Type', 'application/json');
headers_object.append('Access-Control-Request-Headers',"true");

const httpOptions = { headers: headers_object };

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, private loader: LoadingController) { }

  showAlert(title, message, icon, color) {
    Swal.fire({
      title: title,
      html: message,
      icon: icon,
      iconColor: color,
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true
    })
  }

  login(data) {
    this.loader.create({
      message: 'Please wait'
    })
    let url = base_url + 'login';
    let fd = new FormData();
    fd.append('email', data.username);
    fd.append('password', data.password);
    return this.http.post(url, fd)
  }

  registerUser(data) {
    this.loader.create({
      message: 'Please wait'
    })
    let url = base_url + 'registration';
    let fd = new FormData();
    fd.append('email', data.email);
    fd.append('mobile', data.mobile);
    fd.append('name', data.username);
    fd.append('password', data.password);
    return this.http.post(url, fd)
  }


}
