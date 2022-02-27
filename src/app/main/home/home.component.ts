import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { SearchComponentComponent } from '../search-component/search-component.component';

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
  invSearchList: any;
  constructor(private service: GlobalService, private modal: ModalController, private loader: LoadingController, private router: Router) { }

  async ngOnInit() {
    const loader = await this.loader.create({
      message: 'Loading'
    })
    await loader.present();
    this.categoriesList()
    this.packages()
    this.investigations()
    this.sliders()
    await loader.dismiss()
  }

  categoriesList() {
    var method = "GetCategories";
    var res = this.service.getData(method).subscribe(async (data: any) => {
      this.menusList = data.result.menusList;
    }, (error) => {
      this.service.showAlert('Error', 'Something went wrong', 'error','#f00')
    });
  }

  invSearch(value) {
    var method = "invPackSearch"
    console.log(value)
    this.service.getData(method, value).subscribe((res: any ) => {
      if(res.code === "200") {
        this.invSearchList = res.result.search
      }
    }, (error) => {
      this.service.showAlert('Warning', 'No Investigations/Packages Found', 'error','#f00')
    })
  }

  async openSearchModal() {
    const modal = await this.modal.create({
      component: SearchComponentComponent
    })
    await modal.present();
  }

  packages() {
    var method = "GetPackages";
    var res = this.service.getData(method).subscribe(async (data: any) => {
      this.pacakgesList = data.result.packages;
    }, (error) => {
      this.service.showAlert('Error', 'Something went wrong', 'error','#f00')
    });
  }

  invInfo(data) {
    console.log(data)
    this.router.navigate(['/single/' + data.id + '/' + data.type])
  }

  investigations() {
    var method = "popularInvestigations";
    var postData = [];
    postData['popular'] = 1;
    var res = this.service.postGetData(method, postData).subscribe(async (data: any) => {
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
