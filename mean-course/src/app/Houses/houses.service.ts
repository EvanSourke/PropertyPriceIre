import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { House } from './house.model'
import { TitleCasePipe } from '@angular/common';


@Injectable({providedIn: 'root'})
export class HousesService {

  private houses: House[] = [];
  private housesUpdated = new Subject<House[]>();

  constructor(private http: HttpClient) {}

//'http://localhost:3000/api/GET/'+County+'/'+PropertyType+'/'+Start+'/'+End+'/'+PriceFrom+'/'+PriceTo

//{message: string, houses: any}

  // getHouses(County: String, PropertyType: String, Start: String, End: String, PriceFrom: String, PriceTo: String){
  //  this.http.get<{message: string, houses: any}>("http://localhost:3000/api/GET")
  //     .pipe(map(houseData => {
  //       return houseData.houses.map(house => {
  //         return {
  //          Address: house.Address,
  //           County: house.County,
  //           DateofSale: house.DateofSale,
  //           Price: house.Price,
  //           Description: house.Description,
  //           id: house._id
  //         };
  //       });
  //     })
  //   )
  //     .subscribe(transformedHouses => {
  //       this.houses = transformedHouses;
  //       this.housesUpdated.next([...this.houses]);
  //     });

  // }

  getHouses(County: String, Start: String, End: String, PriceFrom: String, PriceTo: String){
    return this.http.get<{County: String, PropertyType: String, Start: String, End: String, PriceFrom: String, PriceTo: String}>(
      "http://localhost:3000/api/GET/"+County+"/"+Start+"/"+End+"/"+PriceFrom+"/"+PriceTo
    )
  }

  getHouseUpdateListener(){
    return this.housesUpdated.asObservable();
  }



  // addPost(title: string, content: string){
  //   const post: Post = {
  //     id: null,
  //     title: title,
  //     content: content
  //   };
  //   this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
  //     .subscribe((responseData)=>{
  //       const id = responseData.postId;
  //       post.id = id
  //       this.posts.push(post);
  //       this.postsUpdated.next([...this.posts]);
  //     });

  // }

  // deletePost(postId: string) {
  //   this.http.delete("http://localhost:3000/api/posts/" + postId)
  //   .subscribe(() => {
  //     const updatedPosts = this.posts.filter(post => post.id !== postId);
  //     this.posts = updatedPosts;
  //     this.postsUpdated.next([...this.posts]);
  //   });
  // }

}
