import { Sektor } from './../../../models/sektor';
import { SektorService } from './../../../services/sektor.service';
import { Obrazovanje } from '../../../models/obrazovanje';
import { ObrazovanjeService } from '../../../services/obrazovanje.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Radnik } from '../../../models/radnik';
import { RadnikService } from '../../../services/radnik.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-radnik-dialog',
  templateUrl: './radnik-dialog.component.html',
  styleUrls: ['./radnik-dialog.component.css']
})
export class RadnikDialogComponent implements OnInit {

  obrazovanje?: Obrazovanje[];
  sektor?: Sektor[];

  public flag?: number; 
  
  obrazovanjeSubscription?: Subscription;
  sektorSubscription?: Subscription;


  constructor(public snackBar:MatSnackBar, 
              public dialogRef:MatDialogRef<RadnikDialogComponent>,
            @Inject (MAT_DIALOG_DATA) public data: Radnik, 
          public radnikService: RadnikService,
          public obrazovanjeService: ObrazovanjeService,
          public sektorService: SektorService,
         ) { }

  ngOnInit(): void {
    this.obrazovanjeSubscription= this.obrazovanjeService.getAllObrazovanje()
    .subscribe(obrazovanje => {
      this.obrazovanje=obrazovanje

    }),
    this.sektorSubscription= this.sektorService.getAllSektor()
    .subscribe(sektor => {
      this.sektor=sektor

    })

  }
  

//add se poziva iz dijalog komp, na submit button 

compareTo(a: { id: any; }, b: { id: any; }) {
  return a.id == b.id;
}
compareTo2(a: { id: any; }, b: { id: any; }) {
  return a.id == b.id;
}
public add(): void { 

this.radnikService.addRadnik(this.data)
.subscribe(data=> {
    this.snackBar.open('Uspesno dodat radnik: '+ data.ime, 'U redu', {
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

  this.radnikService.updateRadnik(this.data)
.subscribe(data=> {
    this.snackBar.open('Uspesno modifikovan radnik: '+ data.ime, 'U redu', {
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
  this.radnikService.deleteRadnik(this.data.id)
  .subscribe(() => {
    this.snackBar.open('Uspesno obrisan radnik: ', 'U redu', {
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
