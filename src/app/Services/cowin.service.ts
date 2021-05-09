import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CowinService {

  constructor(private httpClient: HttpClient) {



   }


   getStates(): Observable<any>{

   return this.httpClient.get<any[]>("https://cdn-api.co-vin.in/api/v2/admin/location/states").pipe(
      tap(_ => console.log('fetched states')),
      catchError(this.handleError<any>('getStates', []))

    );
   }

   getDistricts(id:number): Observable<any>{

    return this.httpClient.get<any[]>("https://cdn-api.co-vin.in/api/v2/admin/location/districts/"+id).pipe(
       tap(_ => console.log('fetched districts')),
       catchError(this.handleError<any>('getStates', []))
 
     );
    }


   findByDistrict(id:number, date: string): Observable<any>{

    return this.httpClient.get<any[]>("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id="+id+"&date="+ date).pipe(
       tap(_ => console.log('fetched by districts')),
       catchError(this.handleError<any>('getStates', []))
 
     );
    }

    findByPincode(pincode:string, date: string): Observable<any>{

      return this.httpClient.get<any[]>("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode="+pincode+"&date="+ date).pipe(
         tap(_ => console.log('fetched by districts')),
         catchError(this.handleError<any>('getStates', []))
   
       );
      }
      getHospitals(sort: string, order: string, page: number): Observable<any> {
        
        var limit = 10*(page+1);
        const requestUrl =
            `https://api.data.gov.in/resource/de59e770-2333-4eaf-9088-a3643de040c8?api-key=579b464db66ec23bdd0000013df5126015d64ea56826832985af680a&format=json&limit=10&offset=${limit + 1}`;

        return this.httpClient.get<any[]>(requestUrl).pipe(
         tap(_ => console.log('fetched by districts')),
         catchError(this.handleError<any>('getStates', []))
   
       );
            
        
      }

   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
}}
