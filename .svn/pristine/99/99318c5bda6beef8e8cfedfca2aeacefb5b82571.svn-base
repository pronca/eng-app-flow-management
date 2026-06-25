import {Pipe} from "@angular/core";

@Pipe({
    name: 'showfilter',
    pure: false
})
export class ShowPipe {
    transform(value) {
        return value.filter(item => {
            return item.filterType == "ComboBox" || item.filterType=="Radio";
        });
    }
}