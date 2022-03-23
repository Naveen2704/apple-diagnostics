import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  selectedUrl: any = 'home';
  year: any = new Date().getFullYear();  
  userData: any = [];
  localCart: any = [] 
  public appPages: any = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'My Profile', url: '/profile', icon: 'person-circle' },
    { title: 'My Orders', url: '/orders', icon: 'reorder-four' },
    { title: 'Login/Signup', url: '/auth', icon: 'lock-closed' },
  ];
  invSearchList: any;

  constructor(private router: Router, private service: AuthService, private global: GlobalService, private route: ActivatedRoute) { 
    this.route.params.subscribe(() => {
      this.selectedUrl = router.url
    })
    
    console.log(this.selectedUrl)
    if(this.userData != null) {
      this.userData = JSON.parse(localStorage.getItem('userInfo'))
    }    
  }

  ngOnInit() {
    this.localCart = JSON.parse(localStorage.getItem('cartItemsCount'))
      if(this.global.cartSub === undefined){
        this.global.cartSub = this.global.invokeCart.subscribe((res:any)=>{
            this.getCartCount();
        });
    }
  }

  invSearch(value) {
    var method = "invPackSearch"
    console.log(value)
    this.global.getData(method, value).subscribe((res: any ) => {
      if(res.code === "200") {
        this.invSearchList = res.result.search
      }
    }, (error) => {
      this.global.showAlert('Warning', 'No Investigations/Packages Found', 'error','#f00')
    })
  }
  
  invInfo(data) {
    console.log(data)
    this.router.navigate(['/single/' + data.id + '/' + data.type])
  }

  changeUrl(url) {
    this.selectedUrl = url
  }

  getCartCount(){
    this.localCart = localStorage.getItem('cartItemsCount_' + this.userData.user_id);
  }

  logout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/auth']);
  }

}
