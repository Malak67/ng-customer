import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { AppStateModel, AuthOutputData } from './app-state.model';
import { AuthService } from '../auth/services/auth.service';
import { CustomerService } from '../customer/services/customer.service';
import { Login, Logout, ListCustomers, CreateCustomer, DeleteCustomer, EditCustomer, GetCustomer } from './app.actions';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Customer } from '../models/customer.model';
import { Utils } from '../utils/utils';
import { Navigate } from '@ngxs/router-plugin';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@State<AppStateModel>({
  name: 'app',
  defaults: {
    auth: {
      token: null,
      email: null,
    },
    account: null,
    customers: [],
    editingCustomer: null,
  }
})
export class AppState {
  @Selector()
  static token(state: AppStateModel): string | null {
    return state.auth.token;
  }

  @Selector()
  static isAuthenticated(state: AppStateModel): boolean {
    return !!state.auth.token;
  }

  @Selector()
  static editingCustomer(state: AppStateModel): Customer | null {
    return state.editingCustomer;
  }

  @Selector()
  static account(state: AppStateModel) {
    return state.account;
  }

  @Selector()
  static customers(state: AppStateModel) {
    return state.customers;
  }

  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private store: Store,
  ) { }

  @Action(Login)
  login(ctx: StateContext<AppStateModel>, action: Login) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      auth: {
        token: null,
        email: null,
      }
    });
    return this.authService.login(action.payload).pipe(
      map((result: AuthOutputData) => {
        ctx.patchState({
          auth: {
            token: result.token,
            email: result.email,
          }
        });
        this.store.dispatch(new Navigate(['/']));
        return;
      }),
      catchError((err: string) => {
        this.openSnackBar(err.toString());
        return of(null);
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AppStateModel>) {
    const state = ctx.getState();
    return this.authService.logout().pipe(
      tap(() => {
        ctx.setState({
          ...state,
          auth: {
            token: null,
            email: null,
          }
        });
        this.store.dispatch(new Navigate(['auth/login'])).subscribe(() => {
          this.openSnackBar(`Logout successful!`);
        });
      }),
      catchError((err: string) => {
        this.openSnackBar(err.toString());
        return of(null);
      })
    );
  }

  @Action(GetCustomer)
  getCustomer(ctx: StateContext<AppStateModel>, action: GetCustomer) {
    const state = ctx.getState();
    return this.customerService.get(action.payload).pipe(
      map((result: number) => {
        const customer: Customer = state.customers.find((c: Customer) => c.id === result);
        ctx.patchState({
          editingCustomer: customer
        });
      }),
      catchError((err: string) => {
        this.openSnackBar(err.toString());
        return of(null);
      })
    );
  }


  @Action(ListCustomers)
  listCustomers(ctx: StateContext<AppStateModel>, action: ListCustomers) {
    return this.customerService.list().pipe(
      map((result: Customer[]) => {
        ctx.patchState({
          customers: result
        });
      }),
      catchError((err: string) => {
        this.openSnackBar(err.toString());
        return of(null);
      })
    );
  }

  @Action(CreateCustomer)
  createCustomer(ctx: StateContext<AppStateModel>, action: CreateCustomer) {
    const state = ctx.getState();
    if (!action.customer) {
      return;
    }
    return this.customerService.create(action.customer).pipe(
      catchError((err: string) => {
        this.openSnackBar(err.toString());
        return of(null);
      }),
      map((result: Customer) => {
        const newCustomers = Utils.deepClone(state.customers);
        const newCustomer: Customer = result;
        newCustomer.id = newCustomers.length + 1;
        newCustomers.push(newCustomer);
        ctx.patchState({
          customers: newCustomers
        });
        this.openSnackBar(`Customer created!`);
        this.store.dispatch(new Navigate(['customer']));
      }),
    );
  }

  @Action(DeleteCustomer)
  deleteCustomer(ctx: StateContext<AppStateModel>, action: DeleteCustomer) {
    const state = ctx.getState();
    if (!action.payload) {
      return;
    }
    return this.customerService.delete(action.payload).pipe(
      catchError((err: string) => {
        this.openSnackBar(err.toString());
        return of(null);
      }),
      map(() => {
        ctx.patchState({
          customers: state.customers.filter(th => th.id !== action.payload)
        });
        this.openSnackBar(`Customer deleted!`);
      })
    );
  }

  @Action(EditCustomer)
  editCustomer(ctx: StateContext<AppStateModel>, action: EditCustomer) {
    const state = ctx.getState();
    if (!action.customer) {
      return;
    }
    return this.customerService.edit(action.customer).pipe(
      catchError((err: string) => {
        this.openSnackBar(err.toString());
        return of(null);
      }),
      map((result: Customer) => {
        const updatedCustomerIndex = state.customers.findIndex(th => th.id === action.customer.id);
        const newCustomers = Utils.deepClone(state.customers);
        newCustomers[updatedCustomerIndex] = result;
        ctx.patchState({
          customers: newCustomers
        });
        this.openSnackBar(`Customer updated!`);
        this.store.dispatch(new Navigate(['customer']));
      })
    );
  }

  private openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
