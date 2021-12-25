import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
})
export class PackagesComponent implements OnInit {

  packagesList: any = [];
  constructor(private service: GlobalService, private route: ActivatedRoute) {
    this.route.params.subscribe((data: any) => {
      this.getPackages();
    })
  }

  ngOnInit() {}

  getPackages() {
    var method = "GetPackages";
    var res = this.service.getData(method).subscribe(async (data: any) => {
      this.packagesList = data.result.packages;
    }, (error) => {
      this.service.showAlert('Error', 'Something went wrong', 'error','#f00')
    });
  }
  
  addToCart(investigation_id) {
    this.service.addCart(investigation_id, 'Package');
  }


}
