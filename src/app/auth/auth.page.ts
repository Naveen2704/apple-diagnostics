import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, MinValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonSlides, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;
  @ViewChild('slides', { static: true }) slides: IonSlides;

  constructor(private form: FormBuilder, private service: AuthService, private router: Router, private loader: LoadingController) { }

  ngOnInit() {
    
    this.loginForm = this.form.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.form.group({
      username: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
      
    this.loginForm.reset();
    this.registerForm.reset();

  }

  async login() {
    if(this.loginForm.invalid) {
      this.service.showAlert('Warning', 'Please enter all fields', 'warning', '#f00');
      return;
    }
    const load = await this.loader.create({
      message: 'Logging in'
    })
    load.present();
    this.service.login(this.loginForm.value).subscribe((res: any) => {
      console.log(res)
      if(res.code === '200') {
        localStorage.setItem('userInfo', JSON.stringify(res.result.userInfo));
        this.router.navigate(['/home'])
      }
      else {
        this.service.showAlert('Error', 'Invalid Credentials', 'error', '#f00');
        this.loader.dismiss();
      }
    });
    load.dismiss();
  }

  async register() {
    if(this.registerForm.invalid) {
      this.service.showAlert('Warning', 'Please enter all fields', 'warning', '#f00');
      return;
    }
    this.loader.create({
      message: 'Saving User Info'
    })
    await this.service.registerUser(this.registerForm.value).subscribe((res: any) => {
      console.log(res)
      if(res.code === '200') {
        JSON.stringify(localStorage.setItem('userInfo', res.result.userInfo));
        this.router.navigate(['/registration-success']);
        this.service.showAlert('Success', 'Registration Successfull. Go Back To Login', 'success', '#0f0');
      }
      else {
        this.service.showAlert('Error', 'Something Went Wrong', 'error', '#f00');
        this.loader.dismiss();
      }
    });
  }

  swipeNext(){
    this.slides.slideNext();  
  }

  swipePrev(){
    this.slides.slidePrev();
  }

}
