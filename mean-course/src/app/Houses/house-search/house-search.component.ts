import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import {startWith, map} from 'rxjs/operators';
import { Subject } from 'rxjs';

import { HousesService } from "../houses.service";
import {Moment} from 'moment';
import { House } from '../house.model';

const moment = require('moment');


@Component({
  selector: 'app-house-search',
  templateUrl: './house-search.component.html',
  styleUrls: ['./house-search.component.css']
})

export class HouseSearchComponent implements OnInit {

  // private houses: House[] =[];
  // private housesUpdated = new Subject<House[]>();



  MainForm : FormGroup;
  DateForm : FormGroup;

  constructor(public housesService: HousesService){
    this.initializeForm();
  };

  initializeForm(){
    this.MainForm = new FormGroup({
      County: new FormControl(''),
      PropertyType: new FormControl(''),
      PriceFrom: new FormControl(''),
      PriceTo: new FormControl(''),
      Address: new FormControl(''),
      Start: new FormControl(''),
      End: new FormControl('')
    });

  }


  PriceSearch=true;
  AddressSearch=false;

 toggleSearch1(){
  this.PriceSearch=true;
  this.AddressSearch=false;
 };
 toggleSearch2(){
  this.PriceSearch=false;
  this.AddressSearch=true;
 };


  //control = new FormControl('');
  counties: string[] = [
  'Antrim',
  'Armagh',
  'Carlow',
  'Cavan',
  'Clare',
  'Cork',
  'Derry',
  'Donegal',
  'Down',
  'Dublin',
  'Fermanagh',
  'Galway',
  'Kerry',
  'Kildare',
  'Kilkenny',
  'Laois',
  'Leitrim',
  'Limerick',
  'Longford',
  'Louth',
  'Mayo',
  'Meath',
  'Monaghan',
  'Offaly',
  'Roscommon',
  'Sligo',
  'Tipperary',
  'Tyrone',
  'Waterford',
  'Westmeath',
  'Wexford',
  'Wicklow'];

  // properties: string[] = ['New Dwelling house /Apartment','Second-Hand Dwelling house /Apartment'];

  prices: string [] = ['50000','75000','100000','125000','150000','175000','200000','225000','250000','275000','300000','325000','350000','375000','400000','450000','500000','600000','700000','800000','800000','1000000', '2000000','5000000']

  filteredCounties: Observable<string[]>;
  // filteredProperties: Observable<string[]>;
  filteredPrices: Observable<string[]>;

  priceSearch(){
    let Start: Moment  = this.MainForm.controls['Start'].value;
    let End: Moment = this.MainForm.controls['End'].value;
    const County = this.MainForm.controls['County'].value;
    const PriceFrom = this.MainForm.controls['PriceFrom'].value;
    const PriceTo = this.MainForm.controls['PriceTo'].value

    console.log(County, moment(Start).format('DD/MM/YYYY'), moment(End).format('DD/MM/YYYY'), PriceFrom, PriceTo);

    //this.housesService.getHouses(County, moment(Start).format('DD/MM/YYYY'), moment(End).format('DD/MM/YYYY'), PriceFrom , PriceTo)

  }


  ngOnInit() {

    console.log("House search component initialised!");


    this.filteredCounties = this.MainForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCounties(value || '')),
    );

    this.filteredPrices = this.MainForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPrices(value || '')),
    );


  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  private _filterCounties(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.counties.filter(counties => this._normalizeValue(value).includes(filterValue));
  }

  private _filterPrices(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.prices.filter(prices => this._normalizeValue(value).includes(filterValue));
  }

  // private _filterProperties(value: string): string[] {
  //   const filterValue = this._normalizeValue(value);
  //   return this.properties.filter(prices => this._normalizeValue(value).includes(filterValue));
  // }

  private _normalizeValue(value: string): string {
    return value.toString().toLowerCase().replace(/\s/g, '');
  }


}
