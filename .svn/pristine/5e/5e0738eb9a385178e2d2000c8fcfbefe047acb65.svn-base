import {Activity, ActivityManager, Choice} from "eng-app";

export default class Utils {
    choice: Choice = {
        //icon:'done',
        text: 'OK',
        cssClass: '{text-align:center;}'
    };
    choice2: Choice = {
        //icon:'done',
        text: 'Lista Estrazioni',
        cssClass: '{text-align:center;}'
    };
    choices: Choice[] = [];

    /**
     * Error Message OK
     * @param header
     * @param body
     * @param activity
     */
    messageError2(header:string,body: string,activity: Activity,param:any,activityManager:ActivityManager){
        this.choices = [];
        this.choices.push(this.choice);
        this.choices.push(this.choice2);
        var i18n = activity.getI18nService();
        return activity.getUserConfirmService().askChooseOneMessage
        (this.choices, i18n.instant(header), i18n.instant(body)).then(function ($event) {
            let startingParams: any = {};
            startingParams.ExtractIds = param;
            startingParams.from = "ConfigurationFilter";
            activityManager.getCurrentPage().setPageMainObject(startingParams);
            activityManager.startChildActivityByName("flow-output.search", startingParams);
            console.log($event);
            console.log(param);
            return;
        });
    }

    /**
     * Error Message OK
     * @param header
     * @param body
     * @param activity
     */
    messageError(header:string,body: string,activity: Activity){
        this.choices = [];
        this.choices.push(this.choice);
        var i18n = activity.getI18nService();
        return activity.getUserConfirmService().askChooseOneMessage
        (this.choices, i18n.instant(header), i18n.instant(body)).then(function () {
            return;
        });
    }
    /**
     * Accept only number
     * @param event
     */
    numberOnly($event): boolean {
        const charCode = ($event.which) ? $event.which : $event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
};


