import { Obrazovanje } from './../../../models/obrazovanje';
import { ObrazovanjeService } from './../../../services/obrazovanje.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-obrazovanje-dialog',
  templateUrl: './obrazovanje-dialog.component.html',
  styleUrls: ['./obrazovanje-dialog.component.css']
})
export class ObrazovanjeDialogComponent implements OnInit {

  public flag?: number; 
  obrazovanjeSubscription?: Subscription;


 


  constructor(public snackBar:MatSnackBar, 
              public dialogRef:MatDialogRef<ObrazovanjeDialogComponent>,
            @Inject (MAT_DIALOG_DATA) public data: Obrazovanje, 
          public preduzeceService: ObrazovanjeService ) { }

  ngOnInit(): void {
  }
//add se poziva iz dijalog komp, na submit button 
public add(): void { 

this.preduzeceService.addObrazovanje(this.data)
.subscribe(data=> {
    this.snackBar.open('Uspesno dodato obrazovanje: '+ data.naziv, 'U redu', {
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

  this.preduzeceService.updateObrazovanje(this.data)
.subscribe(data=> {
    this.snackBar.open('Uspesno modifikovano obrazovanje: '+ data.naziv, 'U redu', {
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
  this.preduzeceService.deleteObrazovanje(this.data.id)
  .subscribe(() => {
    this.snackBar.open('Uspesno obrisano obrazovanje: ', 'U redu', {
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
