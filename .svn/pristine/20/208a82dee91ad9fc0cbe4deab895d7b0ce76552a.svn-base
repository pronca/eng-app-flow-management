import { Component, Inject, ViewEncapsulation } from '@angular/core';

import { ActivityManager, EditActivityComponent, ValueSetsService } from 'eng-app';



import { FlowConfigurationService } from "../flow-configuration.service";
import {
  Dashboard,
  DashboardErrors,
  DashboardPratiche,
  FlowTable,
  FmFlow,
  MotherDashboard
} from "../flow-configuration.model";

import * as moment_ from 'moment';

import { FormGroup } from '@angular/forms';
const moment = moment_;


@Component({
  selector: 'motherDashBoard-activity',
  templateUrl: './motherDashBoard-activity.component.html',
  styleUrls: ['./dashBoard-activity.component.scss'],
  encapsulation: ViewEncapsulation.None,


})




export class MotherDashBoardActivityComponent extends EditActivityComponent {


  firstFormGroup: FormGroup;
  flowTableList: FlowTable[] = [];
  fmflow: FmFlow;
  request: Request;
  dashboard: MotherDashboard[] = [];
  dashboardPratiche: DashboardPratiche[] = [];
  dashboardErrors: DashboardErrors[] = [];

  maxSize: number[] = [];
  maxSizeError: number[] = [];


  maxSizeScarto: number[] = [];
  maxSizeErrorScarto: number[] = [];
  lastUpdateScarto: String;

  max: number;
  maxError: number;
  requestDate: String;
  requestErrorDate: String;
  errorsLabel: String = "Errori";
  errorsValue: String = "0";


  praticheLabel: String = "Pratiche";
  praticheValue: String = "0";

  praticheErrorsLabel: String = "Pratiche errate";
  praticheErrorsValue: String = "0";

  anagraficheErrorsLabel: String;
  anagraficheErrorsValue: String;

  datiCliniciErrorsLabel: String;
  datiCliniciErrorsValue: String;

  ricaviTotaliLabel: String = "Ricavi totali";
  ricaviTotaliValue: String = "0";

  scartoDatiCliniciLabel: String;
  scartoDatiCliniciValue: number;

  scartoAnagraficheLabel: String;
  scartoAnagraficheValue: number;

  after: boolean = false;
  valueFilterMonthFrom: number = 1;
  valueFilterMonthTo: number = new Date().getMonth() + 1;
  valueFilterYear: number = new Date().getFullYear();

  finalMap: Map<String, Dashboard> = new Map();
  visible: boolean = false;
  isDisabled: boolean = true;

  insertArray: Array<any> = [];
  insertTotalArray: Array<any> = [];

  showLoadingIndicator: boolean = true;
  toRed: Array<any> = [];
  toRed2: Array<any> = [];

  constructor(
    private valueSetsService: ValueSetsService,
    private flowConfigurationService: FlowConfigurationService,
    private activityManager: ActivityManager,
    @Inject('item') public item: FmFlow,
  ) {
    super();

  }

  initActivityActions() {
    super.initActivityActions();
    this.activity.removeActivityAction(EditActivityComponent.SAVE_ACTION);
  }



  ngOnInit() {
    this.activity.markDirty = () => { }


    let starterParams: any = this.activity.startingParams;

    if (starterParams.extra != null) {
      this.valueFilterYear = starterParams.extra[0];
      this.valueFilterMonthFrom = starterParams.extra[1];
      this.valueFilterMonthTo = starterParams.extra[2];
    }

    this.getDashboard();

    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */



    this.valueSetsService.registerLocalValueSet("month-value-set", [
      {
        code: 1,
        display: "!i18n#Gennaio",
      }, {
        code: 2,
        display: "!i18n#Febbraio",
      }, {
        code: 3,
        display: "!i18n#Marzo",
      }, {
        code: 4,
        display: "!i18n#Aprile",
      }, {
        code: 5,
        display: "!i18n#Maggio",
      }, {
        code: 6,
        display: "!i18n#Giugno",
      }, {
        code: 7,
        display: "!i18n#Luglio",
      }, {
        code: 8,
        display: "!i18n#Agosto",
      }, {
        code: 9,
        display: "!i18n#Settembre",
      }, {
        code: 10,
        display: "!i18n#Ottobre",
      }, {
        code: 11,
        display: "!i18n#Novembre",
      }, {
        code: 12,
        display: "!i18n#Dicembre",
      }]);



    var comboDate = new Date();

    this.valueSetsService.registerLocalValueSet("year-value-set", [
      {
        code: (comboDate.getFullYear() - 3),
        display: "!i18n#" + (comboDate.getFullYear() - 3).toString()
      },
      {
        code: (comboDate.getFullYear() - 2),
        display: "!i18n#" + (comboDate.getFullYear() - 2).toString()
      },
      {
        code: (comboDate.getFullYear() - 1),
        display: "!i18n#" + (comboDate.getFullYear() - 1).toString()
      },
      {
        code: (comboDate.getFullYear()),
        display: "!i18n#" + (comboDate.getFullYear()).toString()
      },
      {
        code: (comboDate.getFullYear() + 1),
        display: "!i18n#" + (comboDate.getFullYear() + 1).toString()
      }


    ]);

  }

  afterStarted() {




  }







  getDashboard(): void {
    this._lineChartColors2 = [];
    this._lineChartColors = [];
    this.showLoadingIndicator = true;
    this.ricaviTotaliValue = "0";
    this.praticheErrorsValue = "0";
    this.errorsValue = "0";
    this.praticheValue = "0";
    this.scartoAnagraficheValue = 0;
    this.scartoDatiCliniciValue = 0;
    this.dashboard = [];
    this.labelMFL = [];
    this.labelMFL2 = [];
    this.visible = false;
    this.flowConfigurationService.getMotherDashboard(this.valueFilterMonthFrom, this.valueFilterMonthTo, this.valueFilterYear, true)
      .then(result => {
        if (result.success) {

          this.dashboard = result.opTargetObject.items;

          if (this.dashboard!=null && this.dashboard.length>0) {
            setTimeout(() => {
              for (let i = 0; i < this.dashboard.length; i++) {
                if (this.dashboard[i].lastUpdate == null || this.dashboard[i].lastUpdate == undefined) {
                  this.dashboard[i].lastFinalUpdate = "";
                } else {
                  let myMoment = moment(this.dashboard[i].lastUpdate);
                  this.dashboard[i].lastFinalUpdate = myMoment.format('D MMM YYYY HH:mm');
                }


                this.toRed2 = [
                  {
                    backgroundColor: "#24C5D9",
                    borderColor: "#24C5D9"
                  },
                  {
                    backgroundColor: "#64B968",
                    borderColor: "#64B968"
                  }
                ];
                this.toRed = [
                  {
                    backgroundColor: '#24C5D9',
                    borderColor: '#24C5D9'
                  },
                  {
                    backgroundColor: '#64B968',
                    borderColor: '#64B968'
                  }
                ];


                if (this.dashboard[i].countPraticheThisYear > this.dashboard[i].countPraticheLastYear) {
                  this.dashboard[i].arrowPratiche = "arrow_upward"


                  this._lineChartColors2.push(this.toRed);


                }
                else {
                  this.dashboard[i].arrowPratiche = "arrow_downward"



                  this._lineChartColors2.push(this.toRed);

                }

                if (this.dashboard[i].totalThisYear > this.dashboard[i].totalLastYear) {
                  this.dashboard[i].arrowTotal = "arrow_upward"



                  this._lineChartColors.push(this.toRed2);
                }
                else {
                  this.dashboard[i].arrowTotal = "arrow_downward"


                  this._lineChartColors.push(this.toRed2);

                }






                if (this.dashboard[i].countPrtaicheRegioneThisYear > this.dashboard[i].countPrtaicheRegioneLastYear) {
                  this.dashboard[i].arrowRegionPratiche = "arrow_upward"


                }
                else {
                  this.dashboard[i].arrowRegionPratiche = "arrow_downward"

                }

                if (this.dashboard[i].totalRegioneThisYear > this.dashboard[i].totalRegioneLastYear) {
                  this.dashboard[i].arrowRegionTotal = "arrow_upward"

                }
                else {
                  this.dashboard[i].arrowRegionTotal = "arrow_downward"



                }






                let percent = Math.round((((this.dashboard[i].countPraticheThisYear - this.dashboard[i].countPraticheLastYear) / (this.dashboard[i].countPraticheLastYear)) * 100) * 100) / 100
                if (percent == Infinity || isNaN(percent)) {
                  this.dashboard[i].percentPratiche = "N/A";
                  this.dashboard[i].arrowPratiche = "";

                } else {

                  this.dashboard[i].percentPratiche = percent.toString() + "%";
                }


                let percentT = Math.round((((this.dashboard[i].totalThisYear - this.dashboard[i].totalLastYear) / (this.dashboard[i].totalLastYear)) * 100) * 100) / 100;
                if (percentT == Infinity || isNaN(percentT)) {
                  this.dashboard[i].percentTotal = "N/A";
                  this.dashboard[i].arrowTotal = "";


                } else {

                  this.dashboard[i].percentTotal = percentT.toString() + "%";
                }



                let percentReg = Math.round((((this.dashboard[i].countPrtaicheRegioneThisYear - this.dashboard[i].countPrtaicheRegioneLastYear) / (this.dashboard[i].countPrtaicheRegioneLastYear)) * 100) * 100) / 100
                if (percentReg == Infinity || isNaN(percentReg)) {
                  this.dashboard[i].percentRegionPratiche = "N/A";
                  this.dashboard[i].arrowRegionPratiche = "";

                } else {

                  this.dashboard[i].percentRegionPratiche = percentReg.toString() + "%";
                }


                let percentRegT = Math.round((((this.dashboard[i].totalRegioneThisYear - this.dashboard[i].totalRegioneLastYear) / (this.dashboard[i].totalRegioneLastYear)) * 100) * 100) / 100;
                if (percentRegT == Infinity || isNaN(percentRegT)) {
                  this.dashboard[i].percentRegionTotal = "N/A";
                  this.dashboard[i].arrowRegionTotal = "";


                } else {

                  this.dashboard[i].percentRegionTotal = percentRegT.toString() + "%";
                }






                this.insertTotalArray = [{
                  data: [this.dashboard[i].totalLastYear, this.dashboard[i].totalThisYear, Math.abs(this.dashboard[i].totalLastYear - this.dashboard[i].totalThisYear)],
                  label: "Produzione Gestionali"
                },
                {
                  data: [this.dashboard[i].totalRegioneLastYear, this.dashboard[i].totalRegioneThisYear, Math.abs(this.dashboard[i].totalRegioneLastYear - this.dashboard[i].totalRegioneThisYear)],
                  label: "Riconosciuti da Regione"
                }]

                this.insertArray = [{
                  data: [this.dashboard[i].countPraticheLastYear, this.dashboard[i].countPraticheThisYear, Math.abs(this.dashboard[i].countPraticheLastYear - this.dashboard[i].countPraticheThisYear)],
                  label: "Produzione Gestionali"
                },
                {
                  data: [this.dashboard[i].countPrtaicheRegioneLastYear, this.dashboard[i].countPrtaicheRegioneThisYear, Math.abs(this.dashboard[i].countPrtaicheRegioneLastYear - this.dashboard[i].countPrtaicheRegioneThisYear)],
                  label: "Riconosciuti da Regione"
                }]

                this.labelMFL.push(this.insertArray);
                this.labelMFL2.push(this.insertTotalArray);

                this.lineChartLabels2 =[ this.valueFilterYear-1, this.valueFilterYear, "Differenza"];
                this.lineChartLabels =[ this.valueFilterYear-1, this.valueFilterYear, "Differenza"];
                this.visible = true;

          

              }
            }, 300);

          }

          this.showLoadingIndicator = false;

        } else {
          this.activityManager.engApplication.notifyMessage('Errore in fase di caricamento delle dashboard');
          this.showLoadingIndicator = false;
        }
      })
      .catch(e => {
        this.activityManager.engApplication.notifyMessage('Errore in fase di caricamento delle dashboard');
        this.showLoadingIndicator = false;

      }
      );
  }







  serachDashY($event) {

    this.valueFilterYear = $event;


  }

  serachDashMFrom($event) {

    this.valueFilterMonthFrom = $event;

  }


  serachDashMTo($event) {

    this.valueFilterMonthTo = $event;

  }

  startSearch() {
    this.getDashboard();
   /* let starterParams: any = this.activity.startingParams;
    starterParams.extra = [];
    starterParams.extra[0] = this.valueFilterMonthFrom;
    starterParams.extra[1] = this.valueFilterMonthTo;
    starterParams.extra[2] = this.valueFilterYear;
    this.ngOnInit();
  
  */}





  openChildDashboard(flow: any) {

    this.getFlowWithLastVersion(flow);


  }




  getFlowWithLastVersion(flow: any): void {
    this.showLoadingIndicator = true;
    this.flowConfigurationService.getFlowWithLastVersion(flow)
      .then(result => {
        if (result.success) {

          this.fmflow = result.opTargetObject;

          let startingParams: any = {};
          startingParams.editItem = this.fmflow;

          this.activityManager.startChildActivityByName("dashBoard.edit", startingParams);
          this.showLoadingIndicator = false;


        } else {
          this.activityManager.engApplication.notifyMessage('Errore in fase di caricamento delle dashboard');
          this.showLoadingIndicator = false;

        }
      })
      .catch(e => {
        this.activityManager.engApplication.notifyMessage('Errore in fase di caricamento delle dashboard');
        this.showLoadingIndicator = false;

      }
      );
  }





  public lineChartType = 'bar';
  public SystemName: string = "Pratiche";
  firstCopy = false;

  // data
  public lineChartData: Array<number> = [];
  public lineChartDatabis: Array<number> = [];


  public labelMFL: Array<Array<any>> = [];
  // labels
  public lineChartLabels: Array<any> = [];


  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 0
        }
      }]

    },
  };

  _lineChartColors: Array<Array<any>> = [];


  public lineChartType2 = 'bar';
  public SystemName2: string = "Ricavi";
  firstCopy2 = false;

  // data
  public lineChartData2: Array<number> = [];
  public lineChartData2bis: Array<number> = [];

  public labelMFL2: Array<Array<any>> = [];
  // labels
  public lineChartLabels2: Array<any> = [];


  public lineChartOptions2: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 0
        }
      }]

    },
  };

  _lineChartColors2: Array<Array<any>> = [];


}
