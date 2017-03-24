import { Component, Input } from '@angular/core';

declare const Chart;

@Component({
  selector: 'app-chart',
  template: '<div [style.min-height]="minHeight"><chart [type]="chartData.type" [data]="chartData.data" [options]="chartData.options"></chart></div>',
  styles: [
      `div.chart-container {
        height: 100px;
       }`
  ]
})
export class ChartComponent {
@Input() chartData: any = {};
@Input() minHeight: string;

constructor() {
    Chart.pluginService.register({
        beforeDraw: function(chart) {
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
