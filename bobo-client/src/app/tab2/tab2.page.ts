import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, NavController, ToastController} from '@ionic/angular';

import {SigninPage} from '../signin/signin.page';
import {UserService} from '../../shared/services/user.service';
import {filter, mergeMap, tap} from 'rxjs/operators';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
    amount = 0;

    constructor(private alertCtrl: AlertController,
                public navCtrl: NavController,
                private toastController: ToastController,
                private userService: UserService,
                private loadingController: LoadingController) {
    }

    ngOnInit(): void {
        this.getBalance().subscribe(this.setAmount.bind(this));
    }

    getBalance() {
        return this.userService.getBalances();
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
        this.userService.logout()
            .subscribe(async () => {
                this.navCtrl.navigateRoot('/signin');
                const toast = await this.toastController.create({
                    message: 'Logged Out',
                    duration: 2000
                });
                toast.present();
            });
    }

    async faucet() {
        const loading = await this.loadingController.create({
            message: 'Please wait...',
            translucent: true,
        });

        await loading.present();

        this.userService.faucet().pipe(
            mergeMap(() => this.getBalance()),
            tap(() => {
                loading.dismiss();
            }),
        )
            .subscribe(this.setAmount.bind(this), () => {
                loading.dismiss();
            });
    }

    setAmount(data: any) {
        if (data.length > 0) {
            this.amount = data[0].amount;
        }
    }
}
