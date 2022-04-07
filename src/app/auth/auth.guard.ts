import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      //FIXME: if user is authenticated return true, else return to auth page
      return true;
  }
}
