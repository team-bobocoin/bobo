import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {filter, mergeMap} from 'rxjs/operators';
import {AlertController} from '@ionic/angular';

import {HellpeeService} from '../../../shared/services/hellpee.service';
import {TransactionService} from '../../../shared/services/transaction.service';

@Component({
    selector: 'app-helpee',
    templateUrl: 'helpee.page.html',
    styleUrls: ['helpee.page.scss']
})
export class HelpeePage implements OnInit {
    helpee = {
        name: '',
        description: '',
        address: '',
        _id: 0,
    };
    transactions = [];

    constructor(private activatedRoute: ActivatedRoute,
                private alertController: AlertController,
                private helpeeService: HellpeeService,
                private transactionService: TransactionService) {
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

        this.activatedRoute.params.pipe(
            filter((data: any) => !!data.id),
            mergeMap((data: any) => {
                return this.helpeeService.getHelpee(data.id);
            }),
        ).subscribe((helpee: any) => {
            this.helpee = helpee;

            this.transactionService.getTransactions({
                query: {
                    to: this.helpee.address,
                }
            }).subscribe((data: any) => {
                this.transactions = data.transactions;
            });
        });

    }
}
