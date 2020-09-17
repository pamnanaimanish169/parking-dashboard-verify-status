import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { WindowService } from './window.service';

export class PhoneNumber {
  countryCode:string = '91';
  number: string;

  get e164() {
    const num = this.countryCode + this.number;
    return `+${num}`
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  windowRef: any;

  phoneNumber = new PhoneNumber();

  verificationCode: string;

  user: any;

  buttonClicked = false;
  

  constructor(private win: WindowService, private toastrService: ToastrService, private router: Router) {}

  ngOnInit() {
    firebase.initializeApp(environment.firebase)
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    this.windowRef.recaptchaVerifier.render()
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.phoneNumber.e164;

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
    .then(result => {
      this.windowRef.confirmationResult = result;
      this.buttonClicked = true;
    })
    .catch(error => console.log(error))
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
    .confirm(this.verificationCode)
    .then(result => {
      this.user = result.user;
      console.log('I am logged in')
      this.toastrService.success('Logged in successfully.')
      this.router.navigateByUrl('/status')
    })
    .catch(error=>{
      console.log(error, "Incorrect code enetered?")
      this.toastrService.error('Incorrect code enetered?')
    })
  }

  ngOnDestroy() {
  }

}
