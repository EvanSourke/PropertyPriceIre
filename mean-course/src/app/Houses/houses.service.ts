import { Inject, Injectable, forwardRef } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'

import { House } from './house.model'
import { TitleCasePipe } from '@angular/common';
import { houseList } from './houseList.service';
import {Moment} from 'moment';



@Injectable({providedIn: 'root'})
export class HousesService {

  private houses: House[] = [];
  private housesUpdated = new Subject<House[]>();


  constructor(private http: HttpClient, private houseList: houseList) {
    this.houses = [];
  }

//'http://localhost:3000/api/GET/"+County+"/"+Start+"/"+End+"/"+PriceFrom+"/"+PriceTo

//{message: string, houses: any}

  //{County: String, Start: String, End: String, PriceFrom: String, PriceTo: String}

  //, responseType: 'json'

  getHouses(County: string, Start: Date, End: Date, PriceFrom: number, PriceTo: number){
    const params = new HttpParams()
    .set('County', County)
    .set('Start', Start.toString())
    .set('End', End.toString())
    .set('PriceFrom', PriceFrom)
    .set('PriceTo', PriceTo);

    this.http.get<any>('http://localhost:3000/api/GET', { params})
    .pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        console.log('An error occurred while fetching data', errorResponse);
        return throwError('Something went wrong');
      })
    )
    .subscribe(response => {
      this.houses = response.houses;

      // this.houses = this.houses.map(x => "DateofSale: " + x.DateofSale.toLocaleDateString() + "Address: " + x.Address + "County: " + x.County + "Eircode: " + x.Eircode);

      this.housesUpdated.next([...this.houses]);

      console.log(this.houses);
      this.houseList.setData(this.houses);

    })
    // this.housesUpdated.subscribe(updatedHouses => {
    //   console.log(updatedHouses);
    // });

  }

  clearHouses(){
    this.houses = [];
    this.getHouseUpdateListener();

    this.houseList.clearHouses();
  }

   getHouseUpdateListener(){
     return this.housesUpdated.asObservable();
   }


}
