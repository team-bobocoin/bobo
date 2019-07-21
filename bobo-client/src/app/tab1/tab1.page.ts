import {Component, OnInit} from '@angular/core';
import {HellpeeService} from '../../shared/services/hellpee.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    helpees = [];

    constructor(private hellpeeService: HellpeeService,
                private router: Router,
                private alertController: AlertController) {
    }

    ngOnInit() {
        this.hellpeeService.getHellpees()
            .subscribe((data: any) => {
                this.helpees = data.helpees;
            }, async (err: HttpErrorResponse) => {
                switch(err.status) {
                    case 401:
                        const alert = await this.alertController.create({
                            header: 'Alert',
                            message: 'You are not logged in',
                            buttons: ['OK']
                        });

                        await alert.present();

                        this.router.navigate(['signin']);
                        return;
                    default:
                        // Do nothing
                }
            });
    }
}
