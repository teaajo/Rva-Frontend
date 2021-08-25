import { Sektor } from './../../../models/sektor';
import { SektorService } from './../../../services/sektor.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Preduzece } from '../../../models/preduzece';
import { PreduzeceService } from '../../../services/preduzece.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sektor-dialog',
  templateUrl: './sektor-dialog.component.html',
  styleUrls: ['./sektor-dialog.component.css']
})
export class SektorDialogComponent implements OnInit {

  preduzece?: Preduzece[];
  public flag?: number; 
  preduzeceSubscription?: Subscription;

  constructor(public snackBar:MatSnackBar, 
              public dialogRef:MatDialogRef<SektorDialogComponent>,
            @Inject (MAT_DIALOG_DATA) public data: Sektor, 
          public sektorService: SektorService,
          public preduzeceService: PreduzeceService ) { }

  ngOnInit(): void {
    this.preduzeceSubscription= this.preduzeceService.getAllPreduzece()
    .subscribe(preduzece => {
      this.preduzece=preduzece
    })
  }
//add se poziva iz dijalog komp, na submit button 

compareTo(a: { id: any; }, b: { id: any; }) {
  return a.id == b.id;
}
public add(): void { 

this.sektorService.addSektor(this.data)
.subscribe(data=> {
    this.snackBar.open('Uspesno dodat sektor: '+ data.naziv, 'U redu', {
      duration:2500
    });
    
}),

(error:Error) => {
  console.log(error.name + '-->' + error.message);
  this.snackBar.open('Greska! Pokusajte ponovo!: ', 'Zatvori', {
    duration:2500
  });
};
}

public update(): void {

  this.sektorService.updateSektor(this.data)
.subscribe(data=> {
    this.snackBar.open('Uspesno modifikovan sektor: '+ data.naziv, 'U redu', {
      duration:2500
    });
    
}),

(error:Error) => {
  console.log(error.name + '-->' + error.message);
  this.snackBar.open('Greska! Pokusajte ponovo!: ', 'Zatvori', {
    duration:2500
  });
};
}

public delete(): void {
  this.sektorService.deleteSektor(this.data.id)
  .subscribe(() => {
    this.snackBar.open('Uspesno obrisan sektor: ', 'U redu', {
      duration:2500
    });
  }),

  (error:Error) => {
    console.log(error.name + '-->' + error.message);
    this.snackBar.open('Greska! Pokusajte ponovo!: ', 'Zatvori', {
      duration:2500
    });
  };
}

public cancel(): void {

    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmene!: ', 'U redu', {
      duration:1000
    });
}

}
