import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Preduzece } from '../../models/preduzece';
import { PreduzeceService } from '../../services/preduzece.service';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { PreduzeceDialogComponent } from '../dialogs/preduzece-dialog/preduzece-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css']
})
export class PreduzeceComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'naziv', 'opis', 'pib', 'sediste', 'actions'];
  dataSource: MatTableDataSource<Preduzece>;
  subscription: Subscription;
  selektovanoPreduzece?: Preduzece;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private preduzeceService: PreduzeceService, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();

  }
  ngOnDestroy(): void { 
   // this.subscription?.unsubscribe();

  }
    public loadData() { 
      this.subscription = this.preduzeceService.getAllPreduzece()
      .subscribe(data => {
       // console.log(data);
       this.dataSource= new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }),
      
      (error: Error) => { 
        console.log(error.name + ' '+ error.message);
      }
    
    }

    public openDialog(flag: number, id?: number, naziv?: string, opis?: string, pib?: number, sediste?: string) {
      const dialogRef = this.dialog.open(PreduzeceDialogComponent, {data: {id, naziv, opis, pib, sediste}}); //u konstanti cuvamo dijalog koji je otvoren
      dialogRef.componentInstance.flag = flag;
      dialogRef.afterClosed()
        .subscribe(result => {
          if(result===1) {
            this.loadData();
          }
        })
    }

    selectRow(row: any) {
      // console.log(row);
      this.selektovanoPreduzece = row;
      // console.log(this.selektovanaPorudzbina);
    }

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLocaleLowerCase();
      this.dataSource.filter = filterValue;
    }

}
