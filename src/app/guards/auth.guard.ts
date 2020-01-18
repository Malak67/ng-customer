import { Injectable, NgZone } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { AppState } from '../appStore/app.store';
import { Navigate } from '@ngxs/router-plugin';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(readonly ngZone: NgZone, readonly store: Store, readonly router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = this.store.selectSnapshot(AppState.isAuthenticated);
    if (!isAuthenticated) {
      this.store.dispatch(new Navigate(['/auth/login']));
    }
    return isAuthenticated;
  }

  canLoad(): boolean {
    const isAuthenticated = this.store.selectSnapshot(AppState.isAuthenticated);
    if (!isAuthenticated) {
      this.store.dispatch(new Navigate(['/auth/login']));
    }
    return isAuthenticated;
  }
}
