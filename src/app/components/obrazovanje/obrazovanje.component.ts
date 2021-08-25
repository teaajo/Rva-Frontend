import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Obrazovanje } from '../../models/obrazovanje';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ObrazovanjeService } from '../../services/obrazovanje.service';
import { MatDialog } from '@angular/material/dialog';
import { ObrazovanjeDialogComponent } from '../dialogs/obrazovanje-dialog/obrazovanje-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-obrazovanje',
  templateUrl: './obrazovanje.component.html',
  styleUrls: ['./obrazovanje.component.css']
})
export class ObrazovanjeComponent implements OnInit,OnDestroy  {

  displayedColumns = ['id', 'naziv', 'opis', 'actions'];
  dataSource?: MatTableDataSource<Obrazovanje>;
  subscription?: Subscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private obrazovanjeService: ObrazovanjeService, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();

  }
  ngOnDestroy(): void { 
    this.subscription.unsubscribe();

  }
    public loadData() { 
      this.subscription = this.obrazovanjeService.getAllObrazovanje()
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

    public openDialog(flag: number, id?: number, naziv?: string, opis?: string) {
      const dialogRef = this.dialog.open(ObrazovanjeDialogComponent, {data: {id, naziv, opis}}); //u konstanti cuvamo dijalog koji je otvoren
      dialogRef.componentInstance.flag = flag;
      dialogRef.afterClosed()
        .subscribe(result => {
          if(result===1) {
            this.loadData();
          }
        })
    }

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLocaleLowerCase();
      this.dataSource.filter = filterValue;
    }
}
