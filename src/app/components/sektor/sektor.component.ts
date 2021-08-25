import { Component, OnInit, OnDestroy, OnChanges, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Sektor } from '../../models/sektor';
import { SektorService } from '../../services/sektor.service';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { SektorDialogComponent } from '../dialogs/sektor-dialog/sektor-dialog.component';
import { Preduzece } from '../../models/preduzece';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-sektor',
  templateUrl: './sektor.component.html',
  styleUrls: ['./sektor.component.css']
})
export class SektorComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'oznaka', 'preduzece', 'actions'];
  dataSource: MatTableDataSource<Sektor>;
  sektorSubscription: Subscription;
  selektovanSektor: Sektor;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private sektorService: SektorService, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();

  }
  ngOnDestroy(): void { 
   this.sektorSubscription.unsubscribe(); //u trenutku kada je komponenta unistena, mi se unsub sa toka podataka

  }

 
    public loadData() { 
      this.sektorSubscription = this.sektorService.getAllSektor()//posto vraca observable
      .subscribe(data => {
       console.log(data);
       this.dataSource= new MatTableDataSource(data);

       this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'preduzece' ? currentTerm + data.preduzece.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      // sortiranje po nazivu ugnježdenog objekta
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'preduzece': return data.preduzece.naziv.toLocaleLowerCase();
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

    public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, preduzece?: Preduzece) {
      const dialogRef = this.dialog.open(SektorDialogComponent, {data: {id, naziv, oznaka, preduzece}}); //u konstanti cuvamo dijalog koji je otvoren
      dialogRef.componentInstance.flag = flag;
      dialogRef.afterClosed()
        .subscribe(result => {
          if(result===1) {
            this.loadData();
          }
        })
    }

    selectRow(row: any) {
        this.selektovanSektor= row
    }
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLocaleLowerCase();
      this.dataSource.filter = filterValue;
    }
}
