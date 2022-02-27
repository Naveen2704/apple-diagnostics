import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss'],
})
export class SearchComponentComponent implements OnInit {

  @ViewChild('search') search: IonSearchbar;

  constructor() { }

  ngOnInit() {
    this.search.setFocus();
  }

}
