import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { House } from './house.model'
import { HouseListComponent } from './house-list/house-list.component';


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

  clearHouses(){
    this.houses = [];
    this.listUpdate.next([...this.houses]);

  }

  getData() {
    return this.listUpdate.asObservable();;
  }
}
