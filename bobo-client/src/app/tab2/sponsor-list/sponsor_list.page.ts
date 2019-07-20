import {Component, OnInit} from '@angular/core';
import {HellpeeService} from '../../../shared/services/hellpee.service';

@Component({
    selector: 'app-tab2',
    templateUrl: 'sponsor_list.page.html',
    styleUrls: ['sponsor_list.page.scss']
})
export class SponsorListPage implements OnInit {
    helpees = [];

    constructor(private helpeeService: HellpeeService) {
    }

    ngOnInit() {
        this.helpeeService.getHellpees()
            .subscribe((data: any) => {
                this.helpees = data.helpees;
            });
    }


}


