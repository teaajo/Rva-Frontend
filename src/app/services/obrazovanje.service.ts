import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Obrazovanje } from '../models/obrazovanje'; 
import { OBRAZOVANJE_URL } from '../app.constants';

@Injectable({ //angular ima sopstveni dp inj , prihvata property providedIn-- umesto da smo u app modulu sami morali da dodajemo provajder, ne moramo zbog ovoga  
  //oznacava da u jedan ovakav servis mozemo injektovati zavisnosti nekih drugih klasa
  providedIn: 'root'
})
export class ObrazovanjeService {

  constructor(private httpClient: HttpClient) {  }
    //emituje podatke i mozemo da se pretplatimo na taj tok podataka
                                                          //vraca vise vrednosti, mozemo se unsubscribe sa toka podataka 
    public getAllObrazovanje(): Observable<any> {  //metoda koja treba da uputi odg get zahtev ka odg endpointu 
      return this.httpClient.get(`${OBRAZOVANJE_URL}`);;
    }

    public addObrazovanje(obrazovanje: Obrazovanje):Observable<any> {
      obrazovanje.id= 0;
     return  this.httpClient.post(`${OBRAZOVANJE_URL}`, obrazovanje);

    }

    public updateObrazovanje(obrazovanje: Obrazovanje):Observable<any> {
      return  this.httpClient.put(`${OBRAZOVANJE_URL}`, obrazovanje);
 
     }



     
public deleteObrazovanje(id?:number): Observable<any>  {
  return this.httpClient.delete(`${OBRAZOVANJE_URL}/${id}`);


}
  
}
