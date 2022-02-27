import { Injectable, EventEmitter } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { base_url } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  invokeCart = new EventEmitter();
  cartSub: Subscription;

  constructor(private loading: LoadingController, private http: HttpClient) { }
  
  showAlert(title, message, icon, color){
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

  getData(method, id = ''){
    let url = base_url + "/" + method + "/" + id 
    return this.http.get(url);    
  }

  postGetData(method, postData) {
    let url = base_url + "/" + method
    let fd = new FormData();
    fd.append("popular", postData.popular)
    fd.append("category", postData.category)
    fd.append("limit", postData.limit)
    return this.http.post(url, fd)
  }

  addAddress(address_id, date, order_id) {
    var userData = JSON.parse(localStorage.getItem('userInfo'))
    let url = base_url + "/addAddress/";
    let fd = new FormData();
    fd.append("order_id", order_id)
    fd.append("address_id", address_id)
    fd.append("appPlace", "House")
    fd.append("date", date)
    fd.append("user_id", userData.user_id)
    return this.http.post(url, fd);    
  }

  postData(data, order_id, app_date){
    var userData = JSON.parse(localStorage.getItem('userInfo'))
    let url = base_url + "/addOrderInfo/";
    let fd = new FormData();
    console.log(app_date)
    fd.append("order_id", order_id)
    fd.append("appPlace", "In-House")
    fd.append("date", app_date)
    fd.append("name", data.name)
    fd.append("mobile", data.mobile)
    fd.append("user_id", userData.user_id)
    return this.http.post(url, fd)
  }

  async addCart(investigation_id, type) {
    var userData = JSON.parse(localStorage.getItem('userInfo'))
    let url = base_url + "/addToCart/" + investigation_id + "/" + type + "/" + userData.user_id;
    const loader = await this.loading.create({
      message: 'Getting Data'
    })
    await loader.present()
    var res = this.http.get(url).subscribe(async (data: any) => {
      if(data.code === '200') {
        console.log(data)
        this.showAlert('Success', 'Added to Cart Successfully', 'success','#0f0')
      }
      else {
        console.log(data)
        this.showAlert('Error', 'Already in cart', 'error','#f00')
      }
      this.getCartCount();      
    },async (error) => {
      this.showAlert('Error', 'Something went wrong', 'danger','#f00')
    });
    this.loading.dismiss();
  }

  getCartCount() {
    var userData = JSON.parse(localStorage.getItem('userInfo'))
    let url = base_url + "/getCartCount/" + userData.user_id;
    this.http.get(url).subscribe((res: any) => {
      var count = res.result.count
      localStorage.setItem('cartItemsCount_' + userData.user_id, "" +  count)
      this.invokeCart.emit();
    })
  }

  getCart() {
    this.getCartCount()
    var userData = JSON.parse(localStorage.getItem('userInfo'))
    let url = base_url + "/getCart/" + userData.user_id;
    return this.http.get(url);
  }

  async updateData(method, data) { 
    let url = base_url + "/" + method;
    console.log(data)
    const loader = await this.loading.create({
      message: 'Getting Data'
    })
    await loader.present()
    let fd = new FormData();
    for (var key in data) {
      fd.append(key, data[key]);
    }
    var res = this.http.post(url, fd).subscribe(async (data: any) => {
      console.log(data)
      this.showAlert('Success', 'Data Updated Successfully', 'success','#0f0')
    },async (error) => {
      this.showAlert('Error', 'Something went wrong', 'danger','#f00')
    });
    this.loading.dismiss();
    return data;
  }

  async insertData(method, data){
    let url = base_url + "/" + method;
    console.log(data)
    const loader = await this.loading.create({
      message: 'Getting Data'
    })
    await loader.present()
    let fd = new FormData();
    for (var key in data) {
      fd.append(key, data[key]);
    }
    var res = this.http.post(url, fd).subscribe(async (data: any) => {
      console.log(data)
      this.showAlert('Success', 'Data Saved Successfully', 'success','#0f0')
    },async (error) => {
      this.showAlert('Error', 'Something went wrong', 'danger','#f00')
    });
    this.loading.dismiss();
    return data;
  }
}
