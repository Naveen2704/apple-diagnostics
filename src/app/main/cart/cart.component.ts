import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  cartItems: any = [];
  total: any;
  constructor(private service: GlobalService, private route: ActivatedRoute, private router: Router) { 
    this.route.params.subscribe((data: any) => {
      this.getCartItems()
    })
  }

  ngOnInit() {}

  getCartItems() {
    this.service.getCart().subscribe((data: any) => {
      if(data.code === "200") {
        this.cartItems = data.result.cart
        this.total = data.result.total
        console.log(this.cartItems)
      }
      else {
        this.cartItems = "";
      }
    })
  }

  addOrder() {
    var method = "placeOrder";
    var userData: any = JSON.parse(localStorage.getItem('userInfo'));
    this.service.getData(method, userData.user_id).subscribe((res: any) => {
      if(res.code === '200') {
        var order_id = res.result
        this.router.navigate(['/place-order/' + order_id]);
      }
    });    
  }

  removeCart(product_id) {
    Swal.fire({
      title: 'Warning',
      html: 'Are you sure?',
      iconColor: '#f00',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true
    }).then((res) => {
      if(res.isConfirmed == true) {
        var method = "remCart"
        this.service.getData(method, product_id).subscribe((data: any) => {
          this.service.showAlert('Success', 'Deleted Successfully', 'success', '#0f0');
          this.getCartItems()
        })
      }
    })
  }


}
