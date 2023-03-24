import { Component, OnInit, OnDestroy, Injectable} from "@angular/core";
import { Subscription } from "rxjs";
import { House } from "../house.model";
import { HousesService } from "../houses.service";
import { houseList } from "../houseList.service";

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})


export class HouseListComponent implements OnInit, OnDestroy  {

  houses: House[] = [];
  private housesSub: Subscription;
  average: Number = 0;

  constructor(public houseService: HousesService, public houseList: houseList, private sanitizer: DomSanitizer){}

  ngOnInit(){
   // this.House.getHouses();
   console.log("house list component initialised!");

     this.housesSub = this.houseList.getData()
     .subscribe((houses: House[]) => {
     this.houses = houses;


     });


  }

  getAverage(){
    const sum: number = this.houses.reduce((acc, obj) => acc + obj.Price.valueOf(), 0);
    const average = sum/this.houses.length;
    this.average=average;

    return Math.round(average);
  }

  resetAvg(){
    this.average=0;
  }



  ngOnDestroy(){
    this.housesSub.unsubscribe();
  }

}
