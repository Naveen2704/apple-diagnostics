import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
})
export class SingleComponent implements OnInit {

  info: any = [];
  type: any = '';
  constructor(private route: ActivatedRoute, private service: GlobalService) { }

  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      console.log(res['id'])
      this.type = res['id1']
      console.log(this.type)
      this.getInvestigationInfo(res['id'])
    })
  }

  addToCart(investigation_id, type) {
    this.service.addCart(investigation_id, type);
  }

  getInvestigationInfo(investigation_id) {
    this.service.getData('invInfo', investigation_id).subscribe((res: any) => {
      console.log(res)
      if(res.code == '200') {
        this.info = res.result
      }
      else {
        this.info = [];
      }
    })
  }

}
