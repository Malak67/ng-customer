import { AuthInputData } from './app-state.model';
import { Customer } from '../models/customer.model';

export class Login {
  static readonly type = '[Login] Login';
  constructor(public payload: AuthInputData) {}
}

export class Logout {
  static readonly type = '[Logout] Logout';
}

export class ListCustomers {
  static readonly type = '[ListCustomers] Getting all customers';
}

export class CreateCustomer {
  static readonly type = '[CreateCustomer] Create a new customer';
  constructor(public customer: Customer) {}
}

export class EditCustomer {
  static readonly type = '[EditCustomer] Edit an existing customer';
  constructor(public customer: Customer) {}
}

export class GetCustomer {
  static readonly type = '[GetCustomer] Get an existing customer';
  constructor(public payload: number) {}
}

export class DeleteCustomer {
  static readonly type = '[DeleteCustomer] Delete an existing customer';
  constructor(public payload: number) {}
}
