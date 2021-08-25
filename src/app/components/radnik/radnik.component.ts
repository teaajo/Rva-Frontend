import { Component, OnInit, OnDestroy, Input, OnChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Radnik } from '../../models/radnik';
import { RadnikService } from '../../services/radnik.service';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { RadnikDialogComponent } from '../dialogs/radnik-dialog/radnik-dialog.component';
import { Obrazovanje } from '../../models/obrazovanje';
import { Sektor } from '../../models/sektor';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';




@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css']
})
export class RadnikComponent implements OnInit, OnChanges {

  displayedColumns = ['id', 'brojLk', 'ime', 'prezime', 'obrazovanje', 'sektor','actions'];
  dataSource?: MatTableDataSource<Radnik>;
  subscription?: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 @Input() selektovanSektor: Sektor ;

  constructor(private radnikService:RadnikService, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
   // this.loadData();

  }
  ngOnDestroy(): void { 
   //this.subscription?.unsubscribe();

  }

  ngOnChanges(): void {
    if(this.selektovanSektor.id) {
      this.loadData();
    }
  }
    public loadData() { 
      this.subscription = this.radnikService.getAllRadnici(this.selektovanSektor.id)//posto vraca observable
      .subscribe(data => {
       // console.log(data);
       this.dataSource= new MatTableDataSource(data);
       this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'obrazovanje' ? currentTerm + data.obrazovanje.naziv : currentTerm + data[key];

          
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      // sortiranje po nazivu ugnježdenog objekta
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'sektor': return data.sektor.naziv.toLocaleLowerCase();
          case 'obrazovanje': return data.obrazovanje.naziv.toLocaleLowerCase();
          default: return data[property];
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      }),
      (error: Error) => { 
        console.log(error.name + ' '+ error.message);
      }
    
    }

    public openDialog(flag: number, id?: number, brojLk?: number, ime?: string, prezime?: string, obrazovanje?: Obrazovanje,sektor?: Sektor) {
      const dialogRef = this.dialog.open(RadnikDialogComponent, {data: {id, brojLk, ime, prezime, obrazovanje, sektor}}); //u konstanti cuvamo dijalog koji je otvoren
      dialogRef.componentInstance.flag = flag;
      dialogRef.afterClosed()
        .subscribe(result => {
          if(result===1) {
            this.loadData();
          }
        })
    }

    selectRow(row: any) {
        console.log(row);
    }

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLocaleLowerCase();
      this.dataSource.filter = filterValue;
    }
}
