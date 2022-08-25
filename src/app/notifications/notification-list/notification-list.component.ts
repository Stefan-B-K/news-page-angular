import { Component } from '@angular/core';
import { MessageItem, NotificationsService } from "../notifications.service";
import { Observable } from "rxjs";

@Component({
    selector: 'app-notification-list',
    templateUrl: './notification-list.component.html',
    styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent {
    messages$!: Observable<MessageItem[]>


    constructor (private notifications: NotificationsService) {
        this.messages$ = this.notifications.messages$
    }

    clearMessage (id: number) {
        this.notifications.clearMessage(id)
    }
}
