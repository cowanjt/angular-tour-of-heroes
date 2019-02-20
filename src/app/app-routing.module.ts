import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent }      from './heroes/heroes.component';
import { DashboardComponent }      from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

// Routes tell the router which view to display when a user clicks a link or pastes a URL into the browser address bar.
const routes: Routes = [
  // This is an example of how to configure a default route.
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // A typical Angular Route has two properties: path & component
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  // { path: 'detail/:name', component: HeroDetailComponent }
  { path: 'detail/:id', component: HeroDetailComponent }
  
];

@NgModule({
  // Exporting RouterModule makes router directives available for use in the AppModule components that will need them.
  exports: [RouterModule],

  // Configures the RouterModule with the defined routes.
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
