import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
//import { PostCreateComponent } from "./Houses/post-create/post-create.component";
import { HouseSearchComponent } from "./Houses/house-search/house-search.component";


const routes: Routes = [
  { path: '', component: HouseSearchComponent }
  //{ path: 'create', component: PostCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {}
