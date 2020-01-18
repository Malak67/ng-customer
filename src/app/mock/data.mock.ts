import { Customer } from '../models/customer.model';
import { User } from '../models/user.model';

export const CUSTOMERS: Customer[] = [
  {
    id: 1,
    firstName: 'Florin',
    lastName: 'Georgescu',
    phoneNumber: 726700638,
    email: 'flo_georgescu@hotmail.com',
  },
  {
    id: 2,
    firstName: 'First',
    lastName: 'User 1',
    phoneNumber: 720000000,
    email: 'user1@test.com',
  },
  {
    id: 3,
    firstName: 'Second',
    lastName: 'User 2',
    phoneNumber: 731111111,
    email: 'user2@test.com',
  },
  {
    id: 4,
    firstName: 'Third',
    lastName: 'User 3',
    phoneNumber: 742222222,
    email: 'user3@test.com',
  },
  {
    id: 5,
    firstName: 'Forth',
    lastName: 'User 4',
    phoneNumber: 753333333,
    email: 'user4@test.com',
  },
  {
    id: 6,
    firstName: 'Fifth',
    lastName: 'User 5',
    phoneNumber: 764444444,
    email: 'user5@test.com',
  },
];


export const USERS: User[] = [
  {
    id: 1,
    firstName: 'Florin',
    lastName: 'Georgescu',
    email: 'flo@test.com',
    password: 'flo@123'
  },
  {
    id: 2,
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@test.com',
    password: 'admin@123'
  },
  {
    id: 3,
    firstName: 'Normal',
    lastName: 'User',
    email: 'user@test.com',
    password: 'user@123'
  },
];
