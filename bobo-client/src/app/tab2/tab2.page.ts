import {Component} from '@angular/core';
import {AlertController, NavController, ToastController} from '@ionic/angular';

import {SigninPage} from '../signin/signin.page';
import {UserService} from '../../shared/services/user.service';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    constructor(private alertCtrl: AlertController,
                public navCtrl: NavController,
                private toastController: ToastController,
                private userservice: UserService) {
    }

    async presentAlert() {
        const alert = await this.alertCtrl.create({
            message: 'BC Card',
            subHeader: 'Current Cards',
            buttons: ['OK']
        });
        await alert.present();
    }

    logout() {
        this.userservice.logout()
            .subscribe(async () => {
                this.navCtrl.navigateRoot('/signin');
                const toast = await this.toastController.create({
                    message: 'Logged Out',
                    duration: 2000
                });
                toast.present();
            });
    }

}
