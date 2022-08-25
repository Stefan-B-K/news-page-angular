import { Injectable } from '@angular/core';
import { scan, Subject } from "rxjs";


export type MessageItem = {
    id: number
    type: 'success' | 'error' | 'info' | 'clear'
    text?: string
}


@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    private messages = new Subject<MessageItem>();
    messages$ = this.messages
        .pipe(
            scan((acc, value) => (value.type === 'clear' ?
                    acc.filter(message => message.id !== value.id) :
                    [...acc, value]
            ), [] as MessageItem[])
        )
    delay = 5

    /**
     * delay?:  display time in seconds, default 5s
     */
    addSuccessMessage (message: string, delay = this.delay) {
        const id = this.randomId
        this.messages.next({
            id,
            type: 'success',
            text: message
        })
        setTimeout(() => this.clearMessage(id), delay * 1000)
    }

    /**
     * delay?:  display time in seconds, default 5s
     */
    addErrorMessage (message: string, delay = this.delay) {
        const id = this.randomId
        this.messages.next({
            id,
            type: 'error',
            text: message
        })
        setTimeout(() => this.clearMessage(id), delay * 1000)
    }

    /**
     * delay?:  display time in seconds, default 5s
     */
    addInfoMessage (message: string, delay = this.delay) {
        const id = this.randomId
        this.messages.next({
            id,
            type: 'info',
            text: message
        })
        setTimeout(() => this.clearMessage(id), delay * 1000)
    }

    clearMessage (id: number) {
        this.messages.next({ id, type: 'clear' })
    }

    private get randomId (): number {
        return Math.round(Math.random() * 1000000)
    }
}
