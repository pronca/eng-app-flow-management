import { Component, ElementRef, ViewChild} from '@angular/core';
import { Activity, ActivityManager, EditActivityComponent, Promises } from 'eng-app';
import { FlowConfigurationService } from '../flow-configuration/flow-configuration.service';

@Component({
    selector: 'anagrafica-assistito-upload',
    templateUrl: './anagrafica-assistito-upload.component.html',
    styleUrls: ['./anagrafica-assistito.component.scss']
  })
  export class AnagraficaAssistitoUploadComponent extends EditActivityComponent {
    fileName = '';
    data:any[];
    uploading: boolean = false; 
    @ViewChild('fileUpload',{ static: true }) fileUploadEl: ElementRef;
    
    constructor(
        private flowConfigurationService: FlowConfigurationService,
        public activityManager : ActivityManager,
        public activity: Activity){
        super();      
      }

      initActivityActions(){
        this.activity.removeActivityAction(EditActivityComponent.SAVE_ACTION);
        this.activity.removeActivityAction(EditActivityComponent.EDIT_ITEM);
      }
      
      onFileSelected(event) {
        const file:File = event.target.files[0];

        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            var result = {};
            let nome:string = "";
            formData.append("excel", file);
            formData.forEach(function(entr){
              var key = entr[0];
              var value = entr[1]; 
              result[key] = value;
              
            });
           
            console.log("DAA:: "+result);
            //const upload$ = this.http.post("/api/thumbnail-upload", formData);
            //upload$.subscribe();
        }
    }
     
    public fileChanged(event): void {
      
      let inputFile = this.fileUploadEl.nativeElement.files[0];
      if (inputFile) {
        this.fileName = inputFile.name;
      } 
      this.readFile(inputFile).then((file) => {
          this.flowConfigurationService.importAnagraficaAssTable(file).then(response => {
              console.log("RESS:: "+response)
              this.uploading = false;
              if (response.success) {
                  this.activityManager.engApplication.notifyMessage('File importato con successo');
                  this.activityManager.goBack();
              }
              else {
                  this.activityManager.engApplication.notifyMessage('Errore in fase di importazione del file');
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
     
  }


