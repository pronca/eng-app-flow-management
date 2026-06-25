import {Component} from "@angular/core";


import {
    Activity,
    ActivityActionType,
    ActivityManager,
    Promises,
    SearchActivityComponent,
    ValueSetsService
} from "eng-app";

import {FlowConfigurationService} from "../flow-configuration.service";

@Component({ 
    selector: 'drools-search-activity',
    templateUrl: './../../../../../../eng-app/src/app/eng-app/prototype-activity/search-activity/search-activity.component.html',
    styleUrls: ['./drools-search-activity.components.scss']
})
export class DroolsSearchActivityComponent extends SearchActivityComponent {


    constructor(
        private valueSetsService: ValueSetsService,
        public activityManager: ActivityManager,
        public activity: Activity,
        public flowConfigurationService: FlowConfigurationService
    ) {
        super();
    }

    initActivityActions() {
        super.initActivityActions();
        this.activity.removeActivityAction(SearchActivityComponent.NEW_ACTION);

        this.activity.addActivityAction({
            actionType: ActivityActionType.MAIN,
            name: SearchActivityComponent.EDIT_ITEM_ACTION,
            tooltip: "Aggiungi controlli di validazione",
            icon: "add",
            fn: (activity, action) => {
              this.activityManager.startChildActivityByName("drools.edit");
              return Promise.resolve(null);
          }});
      
          this.activity.addActivityAction({
            actionType: ActivityActionType.MAIN,
            name: SearchActivityComponent.EDIT_ITEM_ACTION,
            tooltip: "Carica funzioni di utility",
            icon: "functions",
            fn: (activity, action) => {
                document.getElementById('fileRuleFunctionsInput').click();
            return Promise.resolve(null); 
        }});
      
        this.activity.addActivityAction({
            actionType: ActivityActionType.MAIN,
            name: SearchActivityComponent.EDIT_ITEM_ACTION,
            tooltip: "Scarica funzioni di utility",
            icon: "get_app",
            fn: (activity, action) => {
                this.downloadFunctions();
                return Promise.resolve(null); 
        }});

    }

    ngOnInit(){}

    downloadFunctions() {
        this.flowConfigurationService.downloadDroolsFunctions().then(result => {
            if(result.size > 0) {
                var file = new Blob([result], {type: 'application/zip'});
                var fileURL = URL.createObjectURL(file);
                window.open(fileURL);          
            }
            else{
                this.activityManager.engApplication.notifyMessage('Nessun File trovato');

            }
        
        });
 
    }

    public uploadRuleFunctionsFile_func(event): void {
        let el: any = document.getElementById('fileRuleFunctionsInput');
        let inputFile = el.files[0];
        // let inputFile = this.uploadRuleFunctionsFile.nativeElement.files[0];
        this.readFile(inputFile).then((file) => {
            el.value='';
            this.flowConfigurationService.importDroolsFunctionsFile(file).then(response => {
                if (response.opTargetObject.success) {
                    this.activityManager.engApplication.notifyMessage('File importato con successo');
                } else {
                    this.showRuleErrors(response.opTargetObject.messages);
                }
            }).catch((e) => {
              this.activityManager.engApplication.notifyMessage('Errore inaspettato');
            });
        });
    }

    readFile(inputFile: any): Promise<{
        name: string;
        size: number;
        type: string;
        content: any
      }> {
        let deferred = Promises.defer<any>()
        var reader = new FileReader();
        reader.onload = (onLoadEvent) => {
            var arrayBuffer = onLoadEvent.target['result'];
            console.log("on Load ", onLoadEvent);
            deferred.resolve({
                name: inputFile.name,
                size: inputFile.size,
                type: inputFile.type,
                content: arrayBuffer
            });
        };
        reader.onprogress = (progressEvent) => {
            console.log("onprogress ", progressEvent)
        };
        reader.readAsArrayBuffer(inputFile);
        return deferred.promise;
      }

      showRuleErrors(messages: string[]) {
        let starterParams: any = this.activity.startingParams;
        starterParams.popupHeight = '500px';
        starterParams.popupWidth = '1000px'; 
        starterParams.editItem = messages;
        this.activityManager.startChildPopupActivityByName('drools-error-activity', starterParams);
        return Promise.resolve(null);
      }

}

