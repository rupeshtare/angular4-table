import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TableService } from '../_services/table.service';


@Component({
    selector: 'app-angular4-pagination',
    templateUrl: './angular4-table-pagination.component.html'
})


export class Angular4TablePaginationComponent implements OnInit {
    @Input() total = 0;
    @Input() pageBy = 10;

    @Output() loadData: EventEmitter<any> = new EventEmitter<any>();

    public start = 1;
    public end = 0;
    private filter = null;
    private sort = null;

    constructor(private tableService: TableService) { }

    ngOnInit() {
        this.loadTableData();
        this.end = this.pageBy;

        this.tableService.notifyFilterObservable$.subscribe((data) => {
            this.filter = data;
            this.sort = this.sort;
            this.start = 1;
            this.end = this.pageBy;
            this.loadTableData();
        });

        this.tableService.notifySortObservable$.subscribe((data) => {
            this.filter = this.filter;
            this.sort = data;
            this.start = 1;
            this.end = this.pageBy;
            this.loadTableData();
        });
    }

    loadTableData() {
        const data = { skip: this.start - 1, limit: this.pageBy, filters: this.filter, sort: this.sort };
        this.loadData.emit(data);
    }

    loadNextData() {
        this.start = this.end + 1 <= this.total ? this.end + 1 : this.start;
        this.end = this.end + this.pageBy <= this.total ? this.end + this.pageBy : this.total;
        this.loadTableData();
    }

    loadPreviousData() {
        this.end = this.start - 1 >= 1 ? this.start - 1 : this.end;
        this.start = this.start - this.pageBy >= 1 ? this.start - this.pageBy : this.start;
        this.loadTableData();
    }
}
