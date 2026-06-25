import {Component, EventEmitter, HostBinding, HostListener, Inject, Output} from '@angular/core';

import {
    ActivityAction,
    ActivityActionType,
    ActivityManager,
    EditActivityComponent,
    Promises,
    SearchActivityComponent
} from 'eng-app';

import {FlowConfigurationService} from "../flow-configuration.service";
import {DroolsFile, FlowNative, FmFlow, Version} from "../flow-configuration.model";

@Component({
    selector: 'drools-activity',
    templateUrl: './drools-activity.component.html',
    styleUrls: ['./drools-activity.component.scss']
})

export class DroolsActivityComponent extends EditActivityComponent {


    fmFlow: FmFlow[] = [];
    flows: FlowNative[];
    flow: FlowNative;
    file: any = [];
    file2: any = [];
    versions: Version[] = [];
    version: Version = new Version();
    showLoadingIndicator:boolean = true;
    droolsFile: DroolsFile = new DroolsFile();
    filenames: any = [];
    filenames2: any = [];
    isEdit: boolean;
    isDisableVersion: boolean = true;

    @Output() onFileDropped = new EventEmitter<any>();
	
    @HostBinding('style.background-color') background;
    @HostBinding('style.opacity') opacity = '1';

    constructor(
        private flowConfigurationService: FlowConfigurationService,
        private activityManager: ActivityManager,
        @Inject('SearchActivityComponent') public searchComponent: SearchActivityComponent,
    ){
        super();
    }


    ngOnInit() {

      let starterParams: any = this.activity.startingParams;
      this.droolsFile = starterParams.editItem;
      this.isEdit = !!this.droolsFile;
      if(!this.isEdit) {
        this.droolsFile = new DroolsFile();
      }

      this.retrieveFlow();
    }

    initActivityActions() {
      super.initActivityActions();
      this.activity.removeActivityAction(EditActivityComponent.SAVE_ACTION);

      this.activity.addActivityAction({
        actionType: ActivityActionType.MAIN,
        name: EditActivityComponent.SAVE_ACTION,
        tooltip: "Salva",
        icon: "check",
        fn: (activity, action) => {
            this.executeSaveAction1(null);
            return Promise.resolve(null);
        }});

    }

    retrieveFlow() {
      this.showLoadingIndicator = true;
      this.flowConfigurationService.searchAllFlows().then(response => {
        if (response.success) {
          if (response.opTargetObject.error) {
          } else {
                    this.flows = response.opTargetObject.items;
                    }
        }
        else {
          let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore');
          this.activityManager.engApplication.notifyMessage(errorMessage);
        }
        this.showLoadingIndicator = false;
      }).catch(() => {
        this.showLoadingIndicator = false;
        let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
        this.activityManager.engApplication.notifyMessage(errorMessage);
      });
  
      return Promise.resolve();
    }

    change(change, property) {
      this.droolsFile[property] = change;
    }

    validateInput(): boolean {
      let checkFile : boolean = this.filenames && this.filenames.length > 0;

      if(this.flow.flowType === 'AZIENDA') {
        checkFile = checkFile || this.filenames2 && this.filenames2.length > 0;
      }

      return !!(checkFile && this.droolsFile.versionId && this.droolsFile.flowId);;
    }

    executeSaveAction1(action: ActivityAction): void {
        let opContext = this.startOperation();
        this.beforeSave(opContext);
        let check: boolean = this.validateInput();
        if(check){
          let errors: string[] = [];
          this.showLoadingIndicator = true;
          let results: Promise<any>[] = this.flowConfigurationService.importDroolsFiles(this.file, this.droolsFile.versionId, this.droolsFile.flowId, '1');
          let checkResults: boolean = true;

          Promise.all(results).then(response => {
            console.log(response);
            for(let res in response) {
              let op = response[res];
              if (!op.opTargetObject.success) {
                checkResults = false;
                for(let m of op.opTargetObject.messages) {
                  errors.push(m);
                }
              }
            }

            if(checkResults) {
              let successMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Controlli di validazione salvati con successo');
              this.activityManager.engApplication.notifyMessage(successMessage);

              this.save2LevelRules(opContext);
              
            } else {
              this.showRuleErrors(errors);
            }

          }).catch(() => {
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('Errore durante il caricamento');
            this.activityManager.engApplication.notifyMessage('!i18n# ' + errorMessage);
          }).finally(() => {
            this._zone.run(() => {
            this.showLoadingIndicator = false;
            this.finalizeOperation(opContext);
          });
        });

      } else {
        let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Valorizzare tutti i campi');
        this.activityManager.engApplication.notifyMessage(errorMessage);

        this._zone.run(() => {
           this.showLoadingIndicator = false;
           this.finalizeOperation(opContext);
        });
      }
    }

    save2LevelRules(opContext) {
      if(this.file2 && this.file2.length > 0) {
        let errors = [];
        let checkResults: Boolean = true;
        let results2: Promise<any>[] = this.flowConfigurationService.importDroolsFiles(this.file2, this.droolsFile.versionId, this.droolsFile.flowId, '2');
        Promise.all(results2).then(response => {
          console.log(response);
          for(let res in response) {
            let op = response[res];
            if (!op.opTargetObject.success) {
              checkResults = false;
              for(let m of op.opTargetObject.messages) {
                errors.push(m);
              }
            }
          }

          if(checkResults) {
            let successMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Controlli di validazione trasversale salvati con successo');
            this.activityManager.engApplication.notifyMessage(successMessage);
            this.activityManager.goBack();
          } else {
            this.showRuleErrors(errors);
          }
        
        }).catch(() => {
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('Errore durante il caricamento delle regole di validazione trasversale');
            this.activityManager.engApplication.notifyMessage('!i18n# ' + errorMessage);
          }).finally(() => {
            this._zone.run(() => {
            this.showLoadingIndicator = false;
            this.finalizeOperation(opContext);
          });
        });
      } else {
        this.activityManager.goBack();
      }
    }
       

    //Dragover listener
    @HostListener('dragover', ['$event']) onDragOver(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.opacity = '0.8'
    }
    
    //Dragleave listener
    @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.opacity = '1'
    }
    
    //Drop listener
    @HostListener('drop', ['$event']) public ondrop(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.opacity = '1'
      let files = evt.dataTransfer.files;
      if (files.length > 0) {
        this.onFileDropped.emit(files)
      }
    }

    allowDrop(ev) {
      ev.preventDefault();
    }

    uploadFile(event, type: string) {
      this.manageFile(event.dataTransfer.files[0], type);
    }

    uploadClickFile(files, type: string) {  
      this.manageFile(files[0], type);
    }

    manageFile(inputFile, type: string) {
      this.readFile(inputFile).then((file) => {
        let el:any = document.getElementById('droolsFileInput');
        el.value = '';
        if(type === '1') {
          this.file.push(file);
          this.filenames.push(file.name);
        } else {
          this.file2.push(file);
          this.filenames2.push(file.name);
        }
        let successMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# File caricato');
        this.activityManager.engApplication.notifyMessage(successMessage);
      });
    }

    deleteAttachment(index) {
      this.filenames.splice(index, 1);
      this.file.splice(index, 1);
    }

    deleteAttachment2(index) {
      this.filenames2.splice(index, 1);
      this.file2.splice(index, 1);
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

  initVersion(opt){
    let app = this.droolsFile;
    this.flow = opt;
    this.versions = opt.versions;
    this.droolsFile = app;
    this.isDisableVersion = false;
    this.flow = opt;
	this.versions = opt.versions;
  }

  selecteVersion(fmversion){
    this.version = fmversion;
  }

  showRuleErrors(messages: string[]) {
    let starterParams: any = this.activity.startingParams;
    starterParams.popupHeight = '700px';
    starterParams.popupWidth = '1000px'; 
    starterParams.editItem = messages;
    this.activityManager.startChildPopupActivityByName('drools-error-activity', starterParams);
    return Promise.resolve(null);
  }

}