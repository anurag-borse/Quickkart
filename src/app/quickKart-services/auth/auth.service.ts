import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUserEmail = new BehaviorSubject<string | null>(null);

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get currentUserEmail$(): Observable<string | null> {
    return this.currentUserEmail.asObservable();
  }

  constructor(private _router: Router) {
    const email = sessionStorage.getItem('userName');
    if (email) {
      this.currentUserEmail.next(email);
      this.loggedIn.next(true);
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (sessionStorage.getItem('userName') == null) {
      alert('You are not allowed to view this page');
      return false;
    }
    return true;
  }

  login(email: string) {
    this.loggedIn.next(true);
    this.setCurrentUserEmail(email);
  }

  logout() {
    console.log('Logout called');
    this.loggedIn.next(false);
    this.currentUserEmail.next(null);
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userRole');
    this._router.navigate(['/login']);
  }


  setCurrentUserEmail(email: string) {
    this.currentUserEmail.next(email);
    sessionStorage.setItem('userName', email);
  }

  getCurrentUserEmail(): Observable<string | null> {
    return this.currentUserEmail$;
  }
}
