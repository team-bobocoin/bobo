import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {HellpeeService} from '../../../../shared/services/hellpee.service';
import {TransactionService} from '../../../../shared/services/transaction.service';
import {filter, mergeMap} from 'rxjs/operators';

@Component({
    selector: 'app-tab2',
    templateUrl: 'sponsorhelpee.page.html',
    styleUrls: ['sponsorhelpee.page.scss']
})
export class SponsorListPage implements OnInit {
    name = '';
    description = '';
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
        this.activatedRoute.queryParams.pipe(
            filter((data: any) => !!data._id),
            mergeMap((data: any) => {
                return this.helpeeService.getHelpee(data._id);
            }),
        ).subscribe((helpee: any) => {
            this.helpee = helpee;
            this.name = helpee.name;
            this.description = helpee.description;

            this.transactionService.getTransactions({
                query: {
                    from: this.helpee.address,
                }
            }).subscribe((data: any) => {
                this.transactions = data.transactions;
                console.log(this.transactions);
            });
        });
    }
}


