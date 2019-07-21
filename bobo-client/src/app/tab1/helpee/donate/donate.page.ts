import {Component, OnInit} from '@angular/core';
import {filter} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {UserService} from '../../../../shared/services/user.service';

@Component({
    selector: 'app-donate',
    templateUrl: 'donate.page.html',
    styleUrls: ['donate.page.scss']
})
export class DonatePage implements OnInit {
    amount = 0;
    helpeeID = 0;
    memo = '';

    constructor(private activatedRoute: ActivatedRoute,
                private alertController: AlertController,
                private userService: UserService,
                private loadingController: LoadingController,
                private router: Router) {
    }

    ngOnInit() {
        // this.activatedRoute.queryParams.pipe(
        //     filter((data: any) => !data._id),
        // ).subscribe(async () => {
        //     const alert = await this.alertController.create({
        //         header: 'Alert',
        //         message: 'Wrong access! Please try again',
        //         buttons: ['OK']
        //     });
        //
        //     await alert.present();
        //
        //     history.back();
        // });

        this.activatedRoute.queryParams.pipe(
            filter((data: any) => !!data._id),
        ).subscribe((data: any) => this.helpeeID = data._id);
    }

    plusMoney(amount: number) {
        this.amount += amount;
    }

    goToHelpeeList() {
        this.router.navigate(['/tabs/tab1/helpee/' + this.helpeeID]);
    }

    async donates() {
        const loading = await this.loadingController.create({
            message: 'Please wait...',
            translucent: true,
        });

        await loading.present();

        this.userService.donates(this.helpeeID, this.amount, this.memo)
            .subscribe(async (data: any) => {
                loading.dismiss();
                const alert = await this.alertController.create({
                    message: 'Thank you for your support!',
                    buttons: [{
                        text: 'OK',
                        handler: () => {
                            this.goToHelpeeList();
                        }
                    }]
                });

                await alert.present();
            }, () => {
                loading.dismiss();
            });
    }
}
