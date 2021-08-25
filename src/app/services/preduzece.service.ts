import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preduzece } from '../models/preduzece'; 
import { PREDUZECE_URL } from '../app.constants';

@Injectable({ //angular ima sopstveni dp inj , prihvata property providedIn-- umesto da smo u app modulu sami morali da dodajemo provajder, ne moramo zbog ovoga  
  //oznacava da u jedan ovakav servis mozemo injektovati zavisnosti nekih drugih klasa
  providedIn: 'root'
})
export class PreduzeceService {

  constructor(private httpClient: HttpClient) {  }
    //emituje podatke i mozemo da se pretplatimo na taj tok podataka
                                                          //vraca vise vrednosti, mozemo se unsubscribe sa toka podataka 
    public getAllPreduzece(): Observable<any> {  //metoda koja treba da uputi odg get zahtev ka odg endpointu 
      return this.httpClient.get(`${PREDUZECE_URL}`);;
    }

    public addPreduzece(preduzece: Preduzece):Observable<any> {
      preduzece.id= 0;
     return  this.httpClient.post(`${PREDUZECE_URL}`, preduzece);

    }

    public updatePreduzece(preduzece: Preduzece):Observable<any> {
      return  this.httpClient.put(`${PREDUZECE_URL}`, preduzece);
 
     }



     
public deletePreduzece(id?:number): Observable<any>  {
  return this.httpClient.delete(`${PREDUZECE_URL}/${id}`);


}
  
}
