import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.page.html',
    styleUrls: ['signup.page.scss']
})
export class SignupPage {
    role = 'helper';

    controls = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        description: '',
    };
    signupForm = this.fb.group(this.controls);

    constructor(private fb: FormBuilder,
                private userService: UserService) {
    }

    signup() {
        const params = {
            ...this.signupForm.getRawValue(),
            role: this.role,
        };
        this.userService.signup(params)
            .subscribe((data: any) => {
                history.back();
            });
    }
}


