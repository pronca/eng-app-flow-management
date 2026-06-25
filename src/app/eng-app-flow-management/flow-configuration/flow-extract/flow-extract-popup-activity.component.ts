// import { Component, OnInit } from '@angular/core';
// import { ChartType } from 'chart.js';
// //import { MultiDataSet, Label, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';

// import {
//     EngApplication,
//     EditActivityComponent,
//     ActivityAction,
//     ValueSetsService,
//     OperationResult,
//     ActivityActionType,
//     SearchActivityComponent,
//     ActivityManager,
//     Promises,
//     SearchFilters,
//     ValueSet,
//     SearchContext,
//     SearchDataDTO
// } from 'eng-app';

// @Component({
//   selector: 'flow-extract-popup-activity',
//   templateUrl: './flow-extract-popup-activity.html',
//   styleUrls: ['./flow-extract-popup-activity.css']
// })
// export class FlowExtractPopupActivityComponent extends EditActivityComponent {
//   // Doughnut
//   public doughnutChartLabels: Label[] = ['Validazione Fallita', 'Validazione andata a buon fine', 'Ancora da validare'];
//   public doughnutChartData: MultiDataSet = [
//     [50, 100, 500]
//   ];
//   public doughnutChartType: ChartType = 'doughnut';
//   public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [{
//     beforeDraw(chart) {
//       const ctx = chart.ctx;
//       const txt = 'Center Text';

//       //Get options from the center object in options
//       const sidePadding = 75;
//       const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)

//       ctx.textAlign = 'center';
//       ctx.textBaseline = 'middle';
//       const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
//       const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

//       //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
//       const stringWidth = ctx.measureText(txt).width;
//       const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

//       // Find out how much the font can grow in width.
//       const widthRatio = elementWidth / stringWidth;
//       const newFontSize = Math.floor(30 * widthRatio);
//       const elementHeight = (chart.innerRadius * 2);

//       // Pick a new font size so it will not be larger than the height of label.
//       const fontSizeToUse = Math.min(newFontSize, elementHeight);

//       ctx.font = fontSizeToUse + 'px Arial';
//       ctx.fillStyle = 'blue';

//       // Draw text in center
//       ctx.fillText('Totale record: 650', centerX, centerY);
//     }
//   }];

//   constructor() { super();}

//   ngOnInit() {
//   }

//   // events
//   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
//     console.log(event, active);
//   }

//   public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
//     console.log(event, active);
//   }
// }