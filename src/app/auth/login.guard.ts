import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    // Check if the user does not have a token (not logged in).
    if (!localStorage.getItem('token')) {
      return true; // Allow access to the "login" route.
    }

    // Redirect the user to the "home" route if they already have a token (logged in).
    return this.router.createUrlTree(['/home']);
  }
}
