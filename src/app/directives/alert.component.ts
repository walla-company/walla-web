import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/index';
declare var Notyf;

@Component({
    moduleId: module.id,
    selector: 'wl-alert',
    template: ''
})

export class AlertComponent implements OnInit {
    message: any;

    private noty: any = new Notyf({
        delay: 15000
    });

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(data => {
            if (data.type === 'error') {
                this.noty.alert(data.text);
            } else {
                this.noty.confirm(data.text);
            }
        });
    }
}
