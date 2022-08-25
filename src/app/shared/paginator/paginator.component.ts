import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
    @Input() paginatorSize!: number
    @Input() totalPages!: number
    @Output() pageChanged = new EventEmitter<number>()

    currentPage = 1

    constructor () {}

    get pageRange (): number [] {
        const left = Math.floor((this.paginatorSize - 1) / 2)
        const right = this.paginatorSize - 1 - left
        if (this.currentPage < left + 2) {
            return this.makeRange(1)
        } else if (this.currentPage < this.totalPages - right + 1) {
            return this.makeRange(this.currentPage - 2)
        } else {
            const start = Math.max(this.totalPages - this.paginatorSize + 1, 1)
            return this.makeRange(start)
        }
    }

    makeRange (start: number) {
        const arr = []
        const limit = Math.min(start - 1 + this.paginatorSize, this.totalPages)
        for (let i = start - 1; i < limit; i++) {
            arr.push(i + 1)
        }
        return arr
    }

    setCurrenPage = (page: number) => {
        this.currentPage = page
        this.pageChanged.emit(page)
    }
}
