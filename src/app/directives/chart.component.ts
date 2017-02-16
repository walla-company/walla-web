import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'wl-chart',
    template: '<chart [type]="chartData.type" [data]="chartData.data" [options]="chartData.options"></chart>'
})
export class ChartComponent {
    @Input() chartData: any = {};
}
