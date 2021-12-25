import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  profileInfo: any = [];
  profileForm: FormGroup;
  passwordForm: FormGroup;
  @ViewChild('slides') slide: IonSlides;
  constructor(private service: GlobalService, private route: ActivatedRoute, private form: FormBuilder) { 
    this.route.params.subscribe((res: any) => {
      this.getProfile();
    });
  }

  ngOnInit() {
    this.profileForm = this.form.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required]
    })
    this.passwordForm = this.form.group({
      old: ['', Validators.required],
      new: ['', Validators.required]
    })
  }

  getProfile() {
    var userData = JSON.parse(localStorage.getItem('userInfo'))
    this.service.getData('getProfile', userData.user_id).subscribe((res: any) => {
      if(res.code === '200') {
        this.profileInfo = res.result.userInfo;
      }
      else {
        this.profileInfo = [];
      }
    })
  }

  updateProfile() {
    if(this.profileForm.invalid) { 
      this.service.showAlert('Warning', 'Please fill all fields', 'error', '#f00');
      return;
    }
    // this.service.
  }


}
