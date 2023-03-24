import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HouseListComponent } from "./Houses/house-list/house-list.component";
import { HouseSearchComponent } from "./Houses/house-search/house-search.component";

//{ path: 'list', component: HouseListComponent }
//components={{main: Groups, sidebar: GroupsSidebar}}
const routes: Routes = [
  { path: '', component: HouseSearchComponent, children: [

  ] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {}
