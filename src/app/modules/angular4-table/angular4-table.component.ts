import { Component, Input, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { LocalStorageService } from '../_services/webstorage.service';

@Component({
    selector: 'app-angular4-table',
    templateUrl: './angular4-table.component.html'
})
export class Angular4TableComponent implements OnInit {
    @Input() tableClass = 'table table-hover';
    @Input() tableHeaderClass = 'thead-dark';
    @Input() tableViewClass = 'fa fa-bars text-primary';
    @Input() gridViewClass = 'fa fa-th text-primary';
    @Input() filterIconClass = 'fa fa-filter';
    @Input() columnsIconClass = 'fa fa-columns';
    @Input() columnSortAscIconClass = 'fa fa-sort-alpha-asc';
    @Input() columnSortDescIconClass = 'fa fa-sort-alpha-desc';
    @Input() indexColumn = true;
    @Input() selectableColumn = '_id';
    @Input() defaultColumns: Array<string> = [];
    @Input() tableColumns: Array<string> = [];
    @Input() tableData: Array<object> = [];
    @Input() name: string;
    @Input() total = 0;
    @Input() pageBy = 10;
    @Input() grid = false;
    @Input() selectable = true;
    @Input() filter = true;
    @Input() sort = true;

    @Output() loadData: EventEmitter<any> = new EventEmitter<any>();
    @Output() callBackFunction: EventEmitter<any> = new EventEmitter<any>();

    public selectedColoumns: Array<string>;

    constructor(private localStorageService: LocalStorageService) { }

    ngOnInit() {
        this.getTableColoumns();
    }

    getTableColoumns(): void {
        const columns = this.localStorageService.get(this.name);
        if (columns) {
            this.selectedColoumns = columns;
        } else {
            this.selectedColoumns = this.defaultColumns;
        }
    }

    setTableColoumns(columns: any): void {
        this.selectedColoumns = Object.keys(columns).filter(key => columns[key]);
        this.selectedColoumns = [...this.defaultColumns, ...this.selectedColoumns];
        this.selectedColoumns = this.tableColumns.filter(col => {
            if (this.selectedColoumns.includes(col)) {
                return col;
            }
        });
        this.localStorageService.set(this.name, this.selectedColoumns);
    }

    loadTableData(pageObject: object): void {
        this.loadData.emit(pageObject);
    }

    toggleView(val: boolean): void {
        this.grid = val;
    }

    selectCallBack(data: object): void {
        this.callBackFunction.emit(data);
    }
}
