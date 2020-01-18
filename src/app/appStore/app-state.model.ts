import { Customer } from '../models/customer.model';
import { User } from '../models/user.model';

export interface AppStateModel {
  auth: AuthOutputData;
  account: User;
  customers: Customer[];
  editingCustomer: Customer;
}

export interface AuthInputData {
  email: string;
  password: string;
}

export interface AuthOutputData {
  token: string | null;
  email: string | null;
}
