import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss'],
})
export class TestsComponent implements OnInit {

  investigationsList: any = [];
  constructor(private route: ActivatedRoute, private service: GlobalService) { 
    this.route.params.subscribe(params => {
      if(params.id === null) {
        this.investigations('')
      }
      else {
        this.investigations(params.id)
      }
      
    });
  }

  ngOnInit() {}

  investigations(category) {
    var method = "GetInvestigations";
    this.service.getData(method, category).subscribe((res: any) => {
      if(res.code === '200') {
        this.investigationsList = res.result.investigations;
      }
    });
  }

  addToCart(investigation_id) {
    this.service.addCart(investigation_id, 'Investigation');
  }


}
