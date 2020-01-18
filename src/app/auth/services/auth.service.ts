import { Injectable } from '@angular/core';
import { AuthInputData, AuthOutputData } from '../../appStore/app-state.model';
import { of, Observable, throwError } from 'rxjs';
import * as MOCK from '../../mock/data.mock';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor() { }

  private rand() {
    return Math.random().toString(36).substr(2); // remove `0.`
  }

  private token() {
    return this.rand() + this.rand(); // to make it longer
  }

  login(inputData: AuthInputData): Observable<AuthOutputData> {
    const outputUser: User = MOCK.USERS.find((user: User) => user.email === inputData.email && user.password === inputData.password);
    if (outputUser) {
      const outputData: AuthOutputData = {
        ...outputUser,
        token: this.token()
      };
      return of(outputData);
    } else {
      return throwError('Incorect credentials');
    }
  }

  logout(): Observable<boolean> {
    return of(true);
  }
}
