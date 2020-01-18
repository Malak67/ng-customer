import { Injectable } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { of, Observable } from 'rxjs';
import * as MOCK from '../../mock/data.mock';
import { Store } from '@ngxs/store';
import { AppState } from '../../appStore/app.store';

@Injectable({ providedIn: 'root' })
export class CustomerService {

  constructor(
    readonly store: Store
  ) {}

  create(customer: Customer): Observable<Customer> {
    return of(customer);
  }

  edit(customer: Customer): Observable<Customer> {
    return of(customer);
  }

  get(id: number): Observable<number> {
    return of(id);
  }

  list(): Observable<Customer[]> {
    return of(MOCK.CUSTOMERS);
  }

  delete(id: number): Observable<Customer[]> {
    const customers = MOCK.CUSTOMERS.filter(c => c.id !== id);
    return of(customers);
  }
}
