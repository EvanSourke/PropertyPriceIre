import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { House } from './house.model'

@Injectable({
  providedIn: 'root'
})


export class houseList {
  private houses: House[];

  private listUpdate = new Subject<House[]>();

  setData(data: any) {
    this.houses = data;
    this.listUpdate.next([...this.houses]);

    console.log(this.houses);
  }

  getData() {
    return this.listUpdate.asObservable();;
  }
}
