import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { Checkout } from 'capacitor-razorpay';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
})
export class PlaceOrderComponent implements OnInit {

  newAddressForm: FormGroup;
  inHouseForm: FormGroup;
  addressList : any = []
  order_id: any;
  constructor(private service: GlobalService, private router: Router, private route: ActivatedRoute, private form: FormBuilder, private loader: LoadingController) { 
    this.newAddressForm = this.form.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
    })
    this.inHouseForm = this.form.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      appDate: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.order_id = params.id
      this.addressInfo()
    })
  }

  addressInfo() {
    var userData: any = JSON.parse(localStorage.getItem('userInfo'))
    var method = "getAddress";
    this.service.getData(method, userData.user_id).subscribe((res: any) => {
      if(res.code === '200') {
        this.addressList = res.result.list
      }
    })
  }

  async addNewAddress(date) {
    if(this.newAddressForm.invalid) {
      this.service.showAlert('Warning','Please fill all fields','error','#f00')
      return
    }
    const load = await this.loader.create({
      message: 'Please Wait'
    })
  }

  bookHere(address_id, date) {
    if(date == "") {
      this.service.showAlert("Warning","Select the date first","error","#f00")
    }
    else { 
      this.service.addAddress(address_id, date, this.order_id).subscribe((res: any) => {
        if(res.code === '200') {
          this.service.showAlert("Success","Order Placed Successfully","success","#0f0")
          var amount = res.result.amount*100
          this.payWithRazorpay(res.result.transaction_id, amount)

        }
        else {
          this.service.showAlert("Error","Something Went Wrong","error","#f00")
        }
      })
    }
    
  }
  
  async payWithRazorpay(order_id, price){
    console.log(price)
    const options1 = { 
      key: 'rzp_test_pXaVedARBicyO1',
      amount: price,
      description: 'Apple Diagnostics', 
      image: 'http://localhost:8080/diagnostics/uploads/logo.png', 
      order_id: order_id,
      currency: 'INR', 
      // callback_url: 'htt',
      name: 'Apple Diagnostics', 
      theme: {
        color: '#3399cc'
      }
    }
    try {
      let data = (await Checkout.open(options1));
      console.log(data.response);
    } catch (error) {
      console.log(error)
    }
  }

  bookInHouse() {
    if(this.inHouseForm.invalid) {
      this.service.showAlert('Warning','Please fill all fields','error','#f00')
      return
    }
    
    let date = new Date(this.inHouseForm.value.appDate)
    console.log(date)
    let month = date.getMonth()+1
    let app_date = date.getFullYear() + "-" + month + "-" + date.getDate()
    console.log(app_date)
    this.service.postData(this.inHouseForm.value, this.order_id, app_date).subscribe((res: any)=>{
      if(res.code === '200') {
        this.service.showAlert("Success","Order Placed Successfully","success","#0f0")
        this.payWithRazorpay(res.result.transaction_id,res.result.amount)
      }
      else {
        this.service.showAlert("Error","Something Went Wrong","error","#f00")
      }
    });
  }

}
