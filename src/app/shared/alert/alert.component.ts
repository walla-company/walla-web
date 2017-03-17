import { Component, OnInit } from '@angular/core';
import * as Notyf from 'notyf';

import { AlertService } from '../../services/index';

@Component({
  selector: 'app-alert',
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
