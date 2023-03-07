import { Component, OnInit, OnDestroy} from "@angular/core";
import { Subscription } from "rxjs";
import { House } from "../house.model";
import { HousesService } from "../houses.service";


@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})

export class HouseListComponent implements OnInit, OnDestroy  {

  houses: House[] = [];
  private housesSub: Subscription;


  constructor(public House: HousesService){}

  ngOnInit(){
   // this.House.getHouses();
    this.housesSub = this.House.getPostUpdateListener()
    .subscribe((houses: House[]) => {
      this.houses = houses;
    });
  }

  // onDelete(postId: string){
  //   this.postsService.deletePost(postId);
  // }

  ngOnDestroy(){
    this.housesSub.unsubscribe();
  }

}
