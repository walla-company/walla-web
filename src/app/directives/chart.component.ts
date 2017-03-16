import { Component, Input } from '@angular/core';

declare const Chart;

@Component({
    moduleId: module.id,
    selector: 'wl-chart',
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
        // Chart.controllers.line.extend({
        //     name: 'LineAlt',
        //     initialize: function (data) {
        //         debugger;
        //         Chart.types.Line.prototype.initialize.apply(this, arguments);
        //         const xLabels = this.scale.xLabels;
        //         const labelSpace = Math.round(xLabels.length / 3);
        //         xLabels.forEach(function (label, i) {
        //             if (i !== 0 && i !== xLabels.length - 1 && i !== labelSpace && i !== xLabels.length - 1 - labelSpace) {
        //                 xLabels[i] = '';
        //             }
        //         });
        //     }
        // });
        // http://stackoverflow.com/questions/37250456/chart-js-evenly-distribute-ticks-when-using-maxtickslimit/37257056#37257056
        // Chart.pluginService.register({
        //     afterUpdate: function (chart) {
        //         let xScaleParent = chart.scales['x-axis-0'];
        //         if (!xScaleParent || !xScaleParent.options || !xScaleParent.options.ticks) {
        //             return;
        //         }
        //         if (xScaleParent.options.ticks.maxTicksLimit) {
        //             // store the original maxTicksLimit
        //             xScaleParent.options.ticks._maxTicksLimit = xScaleParent.options.ticks.maxTicksLimit;
        //             // let chart.js draw the first and last label
        //             xScaleParent.options.ticks.maxTicksLimit =
        //                 (xScaleParent.ticks.length % xScaleParent.options.ticks._maxTicksLimit === 0) ? 1 : 2;

        //             const originalXScaleDraw = xScaleParent.draw;
        //             xScaleParent.draw = function () {
        //                 originalXScaleDraw.apply(this, arguments);

        //                 let xScale = chart.scales['x-axis-0'];
        //                 if (xScale.options.ticks.maxTicksLimit) {
        //                     const helpers = Chart.helpers;

        //                     const tickFontColor = helpers.getValueOrDefault(xScale.options.ticks.fontColor,
        //                                                                     Chart.defaults.global.defaultFontColor);
        //                     const tickFontSize = helpers.getValueOrDefault(xScale.options.ticks.fontSize,
        //                                                                     Chart.defaults.global.defaultFontSize);
        //                     const tickFontStyle = helpers.getValueOrDefault(xScale.options.ticks.fontStyle,
        //                                                                     Chart.defaults.global.defaultFontStyle);
        //                     const tickFontFamily = helpers.getValueOrDefault(xScale.options.ticks.fontFamily,
        //                                                                     Chart.defaults.global.defaultFontFamily);
        //                     const tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
        //                     const tl = xScale.options.gridLines.tickMarkLength;

        //                     const isRotated = xScale.labelRotation !== 0;
        //                     const yTickStart = xScale.top;
        //                     const yTickEnd = xScale.top + tl;
        //                     const chartArea = chart.chartArea;

        //                     // use the saved ticks
        //                     const maxTicks = xScale.options.ticks._maxTicksLimit - 1;
        //                     const ticksPerVisibleTick = xScale.ticks.length / maxTicks;

        //                     // chart.js uses an integral skipRatio - this causes all
        //                     // the fractional ticks to be accounted for between the last 2 labels
        //                     // we use a fractional skipRatio
        //                     let ticksCovered = 0;
        //                     helpers.each(xScale.ticks, function (label, index) {
        //                         if (index < ticksCovered) {
        //                             return;
        //                         }

        //                         ticksCovered += ticksPerVisibleTick;

        //                         // chart.js has already drawn these 2
        //                         if (index === 0 || index === (xScale.ticks.length - 1)) {
        //                             return;
        //                         }

        //                         // copy of chart.js code
        //                         let xLineValue = this.getPixelForTick(index);
        //                         const xLabelValue = this.getPixelForTick(index, this.options.gridLines.offsetGridLines);

        //                         if (this.options.gridLines.display) {
        //                             this.ctx.lineWidth = this.options.gridLines.lineWidth;
        //                             this.ctx.strokeStyle = this.options.gridLines.color;

        //                             xLineValue += helpers.aliasPixel(this.ctx.lineWidth);

        //                             // Draw the label area
        //                             this.ctx.beginPath();

        //                             if (this.options.gridLines.drawTicks) {
        //                                 this.ctx.moveTo(xLineValue, yTickStart);
        //                                 this.ctx.lineTo(xLineValue, yTickEnd);
        //                             }

        //                             // Draw the chart area
        //                             if (this.options.gridLines.drawOnChartArea) {
        //                                 this.ctx.moveTo(xLineValue, chartArea.top);
        //                                 this.ctx.lineTo(xLineValue, chartArea.bottom);
        //                             }

        //                             // Need to stroke in the loop because we are potentially changing line widths & colours
        //                             this.ctx.stroke();
        //                         }

        //                         if (this.options.ticks.display) {
        //                             this.ctx.save();
        //                             this.ctx.translate(xLabelValue + this.options.ticks.labelOffset,
        //                                                 (isRotated) ? this.top + 12 : this.options.position === 'top' ?
        //                                                 this.bottom - tl : this.top + tl);
        //                             this.ctx.rotate(helpers.toRadians(this.labelRotation) * -1);
        //                             this.ctx.font = tickLabelFont;
        //                             this.ctx.textAlign = (isRotated) ? 'right' : 'center';
        //                             this.ctx.textBaseline = (isRotated) ? 'middle' : this.options.position === 'top' ? 'bottom' : 'top';
        //                             this.ctx.fillText(label, 0, 0);
        //                             this.ctx.restore();
        //                         }
        //                     }, xScale);
        //                 }
        //             };
        //         }
        //     }
        // });
    }
}
