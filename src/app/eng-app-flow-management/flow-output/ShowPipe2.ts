import {Pipe} from "@angular/core";

@Pipe({
    name: 'showfilter2',
    pure: false
})
export class ShowPipe2 {
    transform(value) {
        return value.filter(item => {
            return item.filterType != "Chips";
        });
    }
}