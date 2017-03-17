import { Component, Input } from '@angular/core';

declare const Chart;

@Component({
  selector: 'app-chart',
  template: '<chart [type]="chartData.type" [data]="chartData.data" [options]="chartData.options"></chart>'
})
export class ChartComponent {
@Input() chartData: any = {};

constructor() {
    Chart.pluginService.register({
        afterInit: function(chart) {
            if (chart.config.type !== 'line' || !chart.scales['x-axis-0'] || !chart.scales['x-axis-0'].ticks) {
                return;
            }
            const xLabels = chart.scales['x-axis-0'].ticks;
            const labelSpace = Math.round(xLabels.length / 3);
            xLabels.forEach(function (label, i) {
                if (i !== 0 && i !== xLabels.length - 1 && i !== labelSpace && i !== xLabels.length - 1 - labelSpace) {
                    xLabels[i] = '';
                }
            });
        }
    });
  }

}
