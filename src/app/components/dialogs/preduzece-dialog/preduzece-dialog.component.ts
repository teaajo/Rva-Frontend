import { Preduzece } from './../../../models/preduzece';
import { PreduzeceService } from './../../../services/preduzece.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preduzece-dialog',
  templateUrl: './preduzece-dialog.component.html',
  styleUrls: ['./preduzece-dialog.component.css']
})
export class PreduzeceDialogComponent implements OnInit {

  public flag: number; 

  constructor(public snackBar:MatSnackBar, 
              public dialogRef:MatDialogRef<PreduzeceDialogComponent>,
            @Inject (MAT_DIALOG_DATA) public data: Preduzece, 
          public preduzeceService: PreduzeceService ) { }

  ngOnInit(): void {
  }
//add se poziva iz dijalog komp, na submit button 
public add(): void { 

this.preduzeceService.addPreduzece(this.data)
.subscribe(data=> {
    this.snackBar.open('Uspesno dodato preduzece: '+ data.naziv, 'U redu', {
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

  this.preduzeceService.updatePreduzece(this.data)
.subscribe(data=> {
    this.snackBar.open('Uspesno modifikovano preduzece: '+ data.naziv, 'U redu', {
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
  this.preduzeceService.deletePreduzece(this.data.id)
  .subscribe(() => {
    this.snackBar.open('Uspesno obrisano preduzece: ', 'U redu', {
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





  



