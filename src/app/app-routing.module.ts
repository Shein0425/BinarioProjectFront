import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LoginGuard } from './auth/login.guard';
import { HomeGuard } from './auth/home.guard';

// Define the application's routing configuration.
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to 'login' for empty path.
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] }, // Use the 'LoginGuard' to protect the 'login' route.
  { path: 'home', component: HomeComponent, canActivate: [HomeGuard] }, // Use the 'HomeGuard' to protect the 'home' route.
  { path: '**', redirectTo: 'login', pathMatch: 'full' } // Redirect to 'login' for any other unmatched route.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Initialize the Angular Router with the defined routes.
  exports: [RouterModule] // Export the RouterModule to make it available for the application.
})
export class AppRoutingModule { }
