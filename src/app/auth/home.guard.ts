import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    // Check if the user has a token (logged in).
    if (localStorage.getItem('token')) {
      return true; // Allow access to the "home" route.
    }

    // Redirect the user to the "login" route if they don't have a token (not logged in).
    return this.router.createUrlTree(['/login']);
  }
}
