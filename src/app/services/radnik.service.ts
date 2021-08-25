import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //angular interfejs koji omogucava slanje http poziva ka apiju
import { Observable } from 'rxjs';
import { Radnik } from '../models/radnik'; 
import { RADNIK_URL, RADNIK_PO_SEKTORU_URL } from '../app.constants';

@Injectable({ //angular ima sopstveni dp inj , prihvata property providedIn-- umesto da smo u app modulu sami morali da dodajemo provajder, ne moramo zbog ovoga  
  //oznacava da u jedan ovakav servis mozemo injektovati zavisnosti nekih drugih klasa
  providedIn: 'root'
})
export class RadnikService {

  constructor(private httpClient: HttpClient) {  }
    //emituje podatke i mozemo da se pretplatimo na taj tok podataka
                                                          //vraca vise vrednosti, mozemo se unsubscribe sa toka podataka 
    public getAllRadnici(idSektor:number): Observable<any> {  //metoda koja treba da uputi odg get zahtev ka odg endpointu, ASINHRON PRISTUP
      return this.httpClient.get(`${RADNIK_PO_SEKTORU_URL}/${idSektor}`);;
    }

    public addRadnik(radnik: Radnik):Observable<any> {
      radnik.id= 0; //bice vr odredjena sekvencom
     return  this.httpClient.post(`${RADNIK_URL}`, radnik);

    }

    public updateRadnik(radnik: Radnik):Observable<any> {
      return  this.httpClient.put(`${RADNIK_URL}`, radnik);
 
     }



     
public deleteRadnik(id?:number): Observable<any>  {
  return this.httpClient.delete(`${RADNIK_URL}/${id}`);


}
  
}