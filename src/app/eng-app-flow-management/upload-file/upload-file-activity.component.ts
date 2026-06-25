import {Component, Inject, HostListener, HostBinding, EventEmitter, Output} from '@angular/core';
import { UploadFileSearchActivityComponent } from './upload-file-search-activity/upload-file-search-activity.component';

import {
    ActivityAction,
    ActivityActionType,
    ActivityManager,
    Choice,
    EditActivityComponent,
    SearchActivityComponent,
    Promises,
    OperationResult
} from 'eng-app';

import { FlowConfigurationService } from "../flow-configuration/flow-configuration.service";
import {
    FlowNative,
    FlowTableField,
    JobTalend,
    Version,
    UploadRequest,
    FlowSectionFile,
    SectionFile
} from '../flow-configuration/flow-configuration.model';
import { DialogContentExampleDialog } from '../dialog-box/dialog-content-example-dialog';
import { MatDialog, MatTableDataSource } from '@angular/material';

// @ts-ignore
@Component({
    selector: 'upload-file-activity',
    templateUrl: './upload-file-activity.component.html',
    styleUrls: ['./upload-file-activity.component.scss'],
})

export class UploadFileActivityComponent extends EditActivityComponent {
    choice: Choice = {
        text: 'OK',
        cssClass: '{text-align:center;}'
      };
      isDisableVersion: boolean = true;
      choices: Choice[] = [];
      flows: FlowNative[];
      flow: FlowNative;
      file: any = [];
      versions: Version[] = [];
      version: Version = new Version();
      showLoadingIndicator:boolean = true;
      talendJob: JobTalend = new JobTalend();
      files: any = [];
      editFlow: boolean = false;
      opt_id: string;
      version_id:string;
      dateFields: FlowTableField[] = [];
      modAllowed: boolean = false;
      stati = [
        {name: 'Corrette'},
        {name: 'Mai Inviate'},
        {name: 'Già Inviate'},
        {name: 'Tutte'}
      ];
      dipendences:any = [];
      dip: any = [];
      xsd: any = [];
      dipModif: boolean = false;
      xsdModif: boolean = false;
      comboXSD: any[] = [];
      xsdChoice: any = [];
      sectionBox: FlowSectionFile[];
      sectionFiles: any[] = [];
      uploadRequest: UploadRequest = new UploadRequest();
      sectionName:string[] = [];
      displayedColumns: string[] = ['section','check','upload','delete'];
      dataSource: any;
  
      @Output() onFileDropped = new EventEmitter<any>();
      
      @HostBinding('style.background-color') background;
      @HostBinding('style.opacity') opacity = '1';
  
      constructor(
        public dialog: MatDialog,
        private flowConfigurationService: FlowConfigurationService,
        private activityManager: ActivityManager,
        @Inject('SearchActivityComponent') public searchComponent: UploadFileSearchActivityComponent
      ) {
        super();
      }
  
  
      ngOnInit() {
  
        let starterParams: any = this.activity.startingParams;
  
          if (starterParams && starterParams.editItem) {
            this.modAllowed = true;
            this.uploadRequest = starterParams.editItem;

            this.editFlow = true;
  
            this.flow = this.uploadRequest.flow;
            this.version = this.uploadRequest.version;
            this.versions.push(this.uploadRequest.version);
  
            this.opt_id = this.flow.id;
            this.version_id = this.version.id
            this.sectionBox = [];
            this.retriveFormFlowByFlowVersion(this.flow ,this.version);

            // this.dataSource = new MatTableDataSource<any>(this.generateDatasource());

            // this.sectionBox = this.uploadRequest.files;
            // for(let i=0; i<this.uploadRequest.files.length; i++){
            //   this.sec[i] = this.uploadRequest.files[i].section;
            // }
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
              this.executeSaveActionAll(null);
              return Promise.resolve(null);
          }});
  
      }
  
      retrieveFlow() {
        this.showLoadingIndicator = true;
        this.flowConfigurationService.searchFlowExtr().then(response => {
          if (response.success) {
            if (response.opTargetObject.error) {
              //this.manageError(response.opTargetObject.error);
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
        this.talendJob[property] = change;
      }
  
      convert(): boolean{
          if(this.flow && 
            this.version) {
            
            this.uploadRequest.version = this.version;
            this.uploadRequest.flow = this.flow;
            this.uploadRequest.files = [];
            for(let j=0; j<this.sectionBox.length; j++){
              if(this.sectionBox[j]){
                let sectionfile: SectionFile = new SectionFile();
                this.sectionBox[j].file = sectionfile;
                this.uploadRequest.files.push(this.sectionBox[j]);
              }
            }

            return true;
          } else {
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore: valorizzare campi obbligatori');
            this.activityManager.engApplication.notifyMessage(errorMessage);
            return false;
          }
        }

      saveAllFiles(uploadRequest: UploadRequest, sectionFile: any, sec: any){
        // let opContext = this.startOperation();
        // this.beforeSave(opContext);
        this.flowConfigurationService.saveUploadFile(uploadRequest, sectionFile, sec).then(response => {
          if (response.success) {
            this.showLoadingIndicator = false;
            this.dataSource.data[sec]["check"] = "uploaded";
          } else {
            this.showLoadingIndicator = false;
            let errorMessage: string = this.activityManager.engApplication.i18nInstant(response.opTargetObject.message);
            this.activityManager.engApplication.notifyMessage(errorMessage);
          }
        }).catch(() => {
            this.showLoadingIndicator = false;
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
            this.activityManager.engApplication.notifyMessage(errorMessage);
          });
        return Promise.resolve();
      }

      /*
      saveRequest(uploadRequest: UploadRequest) {
          this.showLoadingIndicator = true;

          return this.flowConfigurationService.saveUploadRequest(uploadRequest).then(response => {
              if (response.success) {
                  this.uploadRequest.id = response.opTargetObject;

                  // Costruisco tutte le promesse dei file
                  const filePromises: Promise<OperationResult<any>>[] = [];

                  for (let i = 0; i < this.sectionFiles.length; i++) {
                      const file = this.sectionFiles[i];
                      if (file) {
                          filePromises.push(
                              this.flowConfigurationService.saveUploadFile(this.uploadRequest, file, String(this.sectionBox[i].section))
                          );
                      }
                  }

                  // Attendo tutte le promise
                  return Promise.all(filePromises).then(results => {
                      const failedFiles = results.filter(r => !r.success);

                      if (failedFiles.length > 0) {
                          //Almeno un file non è stato salvato (es. formato errato)
                          let messages = failedFiles.map(f => f.opTargetObject.message || 'Errore durante il salvataggio di un file. Formato non supportato. I formati supportati sono : TXT, CSV, XLS, XLSX, ZIP, GZ, TAR.GZ, TGZ');
                          let errorMessage = messages.join('\n');
                          this.activityManager.engApplication.notifyMessage(errorMessage);
                          this.showLoadingIndicator = false;
                          return; //NON esegue goBack()
                      }

                      // ✅ Tutti i file salvati correttamente
                      this.showLoadingIndicator = false;
                      let successMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Salvataggio effettuato con successo');
                      this.activityManager.engApplication.notifyMessage(successMessage);
                      this.activityManager.goBack();
                  });

              } else {
                  this.showLoadingIndicator = false;
                  const errorMessage: string = this.activityManager.engApplication.i18nInstant('ERR');
                  this.activityManager.engApplication.notifyMessage(errorMessage);
              }
          }).catch(() => {
              this.showLoadingIndicator = false;
              const errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
              this.activityManager.engApplication.notifyMessage(errorMessage);
          });
      }
    */

    saveRequest(uploadRequest: UploadRequest) {
      this.showLoadingIndicator = true;

      //Primo step: salvataggio richiesta principale
      return this.flowConfigurationService.saveUploadRequest(uploadRequest)
        .then(response => {
          if (!response.success) {
            throw new Error(this.activityManager.engApplication.i18nInstant('ERR'));
          }

          this.uploadRequest.id = response.opTargetObject;

          //Creo le promesse per il caricamento file
          const filePromises: Promise<OperationResult<any>>[] = [];
          for (let i = 0; i < this.sectionFiles.length; i++) {
            const file = this.sectionFiles[i];
            if (file) {
              filePromises.push(
                this.flowConfigurationService.saveUploadFile(this.uploadRequest, file, String(this.sectionBox[i].section))
              );
            }
          }

          //Attendo il completamento di TUTTI i salvataggi dei file
          return Promise.all(filePromises);
        })
        .then(results => {
          const failedFiles = results.filter(r => !r.success);

          if (failedFiles.length > 0) {
            //almeno un file non salvato correttamente → interrompo flusso
            const messages = failedFiles.map(f => f.opTargetObject.message || 'Errore durante il salvataggio di un file. Formato non supportato.');
            const errorMessage = messages.join('\n');
            this.activityManager.engApplication.notifyMessage(errorMessage);
            this.showLoadingIndicator = false;
            return Promise.reject('File non validi'); //blocca la catena e NON chiama validationFileUpload
          }

          //tutti i file salvati correttamente → passo alla validazione
          return this.flowConfigurationService.validationFileUpload(this.uploadRequest);
        })
        .then(validationResponse => {
          if (validationResponse.success) {
            const successMessage = this.activityManager.engApplication.i18nInstant('!i18n# Salvataggio e validazione completati con successo');
            this.activityManager.engApplication.notifyMessage(successMessage);

            //aggiorna tabella pagina di ricerca
            if (this.searchComponent && this.searchComponent.retrieveFlowFileUpload) {
              this.searchComponent.retrieveFlowFileUpload(this.searchComponent.filterGlob, false);
            }

            this.activityManager.goBack(); //solo dopo la validazione
          } else {
            const errorMessage = this.activityManager.engApplication.i18nInstant('!i18n# Errore durante la validazione');
            this.activityManager.engApplication.notifyMessage(errorMessage);
          }

          this.showLoadingIndicator = false;
        })
        .catch(err => {
          //gestisce QUALSIASI errore a valle (saveRequest, file upload, validation)
          if (err !== 'File non validi') {
            const errorMessage = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato in fase di validazione');
            this.activityManager.engApplication.notifyMessage(errorMessage);
          }
          this.showLoadingIndicator = false;
        });
    }


      executeSaveActionAll(action: ActivityAction){
          let check: boolean = this.convert();
          if(check){
            this.showLoadingIndicator = true;
            this.saveRequest(this.uploadRequest);
          } else {
              this.showLoadingIndicator = false;
          }
      }
  
    //  
  
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
  
      uploadFile(event,element) {
        this.modAllowed = false;
        let flowSectionFile: FlowSectionFile = new FlowSectionFile();
        for(let i=0;i<this.dataSource.data.length; i++){
          if(this.dataSource.data[i]["section"] == element["section"]){
            flowSectionFile.section = i;
            this.sectionBox[i] = flowSectionFile;
          }
        }

          let inputFile = event[0];
          this.readFile(inputFile).then((file) => {
  
            this.file = [file];
            for(let i=0;i<this.dataSource.data.length; i++){
              if(this.dataSource.data[i]["section"] == element["section"]){
                this.sectionFiles[i] = this.file[0];
                this.dataSource.data[i]["check"] = "uploading";
              }
            }
            
            let successMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# File caricato');
            this.activityManager.engApplication.notifyMessage(successMessage);
  
            let el: HTMLElement = document.getElementById('uploadFileInput');
            el.nodeValue = undefined;
        
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
  
    initVersion(opt){
      this.sectionBox = undefined;
      this.sectionFiles = undefined;
      this.sectionName = [];
      this.dataSource = undefined;
      this.isDisableVersion = false;
      this.flow = opt;
      this.versions = opt.versions;
    }
  
    selecteVersion(fmversion){
      this.version = fmversion;
      this.retriveFormFlowByFlowVersion(this.flow,this.version);
    }

    retriveFormFlowByFlowVersion(flow: FlowNative, version: Version){
    this.showLoadingIndicator = true;
    this.flowConfigurationService.retriveFormFlowByFlowVersion(flow.id,version.id).then(response => {
        if (response.success) {
            if (response.opTargetObject.error) {
              this.showLoadingIndicator = false;
            //this.manageError(response.opTargetObject.error);
            } else {
                this.showLoadingIndicator = false;
                let length = response.opTargetObject.items[0].flowTableList.length;
                this.sectionBox = [length];
                this.sectionFiles = [length];
                for(let i=0; i<length; i++){
                    this.sectionBox[i] = undefined;
                    this.sectionFiles[i] = undefined;
                    this.sectionName.push(response.opTargetObject.items[0].flowTableList[i].name);
                }
                this.dataSource = new MatTableDataSource<any>(this.generateDatasource());
            }
        }
        else {
            this.showLoadingIndicator = false;
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        }
        }).catch(() => {
          this.showLoadingIndicator = false;
          let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
          this.activityManager.engApplication.notifyMessage(errorMessage);
        });
    
        // return sections;
    }

    deleteAttachment(element) {
      let index;
      for(let i=0;i<this.dataSource.data.length; i++){
        if(this.dataSource.data[i]["section"] == element["section"]){
          index = i;
        }
      }
      const dialogRef = this.dialog.open(DialogContentExampleDialog, {
        data: {
            header: "Cancellazione file",
            text: "Si conferma la cancellazione?",
            b2: "Esci",
            b1: "Continua"
        }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.flowConfigurationService.deleteFileUpload(this.uploadRequest.id, String(index)).then(response => {
          if (response.success) {
            if (response.opTargetObject.message) {
              let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore: ' + response.opTargetObject.mesage);
              this.activityManager.engApplication.notifyMessage(errorMessage);
            }
            else{
              //CANCELLO DALLA LISTA
              this.sectionFiles.splice(index, 1);
              this.sectionBox.splice(index, 1);
              this.dataSource.data[index]["check"] = "not_uploaded";
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
        }
      });
    }

  generateDatasource(): Array<any>{
    let data: any[] = [];
    for(let i=0; i<this.sectionName.length; i++){
      let found: boolean = false;
      data[i] = [];
      data[i]["section"] = this.sectionName[i];
      if(this.uploadRequest.files){
        for(let j=0; j<this.uploadRequest.files.length; j++){
          if(this.uploadRequest.files[j]){
            if(this.uploadRequest.files[j].section == i){
              found = true;
              data[i]["check"] = "uploaded";
            }
          }
        }
        if(!found){
          data[i]["check"] = "not_uploaded";
        }
      }else{
        data[i]["check"] = "not_uploaded";
      }
      data[i]["upload"] = "upload";
      data[i]["delete"] = "delete";
    }
    return data;
  }

}

