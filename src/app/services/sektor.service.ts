import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //angular interfejs koji omogucava slanje http poziva ka apiju
import { Observable } from 'rxjs';
import { Sektor } from '../models/sektor'; 
import { SEKTOR_URL } from '../app.constants';

@Injectable({ //angular ima sopstveni dp inj , prihvata property providedIn-- umesto da smo u app modulu sami morali da dodajemo provajder, ne moramo zbog ovoga  
  //oznacava da u jedan ovakav servis mozemo injektovati zavisnosti nekih drugih klasa
  providedIn: 'root'
})
export class SektorService {

  constructor(private httpClient: HttpClient) {  }
    //emituje podatke i mozemo da se pretplatimo na taj tok podataka
                                                          //vraca vise vrednosti, mozemo se unsubscribe sa toka podataka 
    public getAllSektor(): Observable<any> {  //metoda koja treba da uputi odg get zahtev ka odg endpointu, ASINHRON PRISTUP
      return this.httpClient.get(`${SEKTOR_URL}`);;
    }

    public addSektor(sektor: Sektor):Observable<any> {
      sektor.id= 0; //bice vr odredjena sekvencom
     return  this.httpClient.post(`${SEKTOR_URL}`, sektor);

    }

    public updateSektor(sektor: Sektor):Observable<any> {
      return  this.httpClient.put(`${SEKTOR_URL}`, sektor);
 
     }



     
public deleteSektor(id?:number): Observable<any>  {
  return this.httpClient.delete(`${SEKTOR_URL}/${id}`);


}
  
}