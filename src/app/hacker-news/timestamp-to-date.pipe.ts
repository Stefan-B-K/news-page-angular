import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {

    transform (timestamp: number): string {
        return new Date(timestamp * 1000).toISOString()

    }
}
