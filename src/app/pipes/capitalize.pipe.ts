import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "capitalize" })
export class CapitalizePipe implements PipeTransform {
    transform(stringValue: string) {
        if (stringValue) {
            return stringValue.replace(/\w\S*/g, (txt) => {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
        return stringValue;
    }
}