import { Component } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: 'signin.page.html',
  styleUrls: ['signin.page.scss']
})
export class SigninPage {


  controls = {
    email: '',
    password: '',
  };

  signinForm = this.fb.group(this.controls);

  constructor(private fb: FormBuilder,
              private userService: UserService) {
  }
  signin() {
    this.userService.signin(this.signinForm.getRawValue())
        .subscribe((data: any) => {
          console.log(data);
        });
  }
}


