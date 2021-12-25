import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  pacakgesList: any = [];
  menusList: any = [];
  investigationsList: any = [];
  slidersList: any = [];
  constructor(private service: GlobalService) { }

  ngOnInit() {
    this.categoriesList()
    this.packages()
    this.investigations()
    this.sliders()
  }

  categoriesList() {
    var method = "GetCategories";
    var res = this.service.getData(method).subscribe(async (data: any) => {
      this.menusList = data.result.menusList;
    }, (error) => {
      this.service.showAlert('Error', 'Something went wrong', 'error','#f00')
    });
  }

  packages() {
    var method = "GetPackages";
    var res = this.service.getData(method).subscribe(async (data: any) => {
      this.pacakgesList = data.result.packages;
    }, (error) => {
      this.service.showAlert('Error', 'Something went wrong', 'error','#f00')
    });
  }

  investigations() {
    var method = "GetInvestigations";
    var res = this.service.getData(method).subscribe(async (data: any) => {
      this.investigationsList = data.result.investigations;
    }, (error) => {
      this.service.showAlert('Error', 'Something went wrong', 'error','#f00')
    });
  }
  
  addToCart(investigation_id, type) {
    this.service.addCart(investigation_id, type);
  }

  sliders() {
    this.service.getData('sliders').subscribe((res: any) => {
      if(res.code === '200') {
        this.slidersList = res.result.sliders;
      }
    })
  }


}
