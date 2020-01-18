import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { Customer } from '../../models/customer.model';
import { AppState } from '../../appStore/app.store';
import { HelperService } from '../../shared/services/helper.service';
import { DeleteCustomer, ListCustomers } from '../../appStore/app.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  @Select(AppState.customers) customers$: Observable<Customer[]>;

  DATA: Customer[];
  displayedColumns: string[] = [
    'id', 'firstName', 'lastName', 'email', 'phoneNumber', 'actions'
  ];
  subscriptionCustomer: Subscription;
  subscriptionDeleteDialog: Subscription;
  @ViewChild('deleteDialog', { static: true }) deleteDialog: TemplateRef<any>;
  dataSource: MatTableDataSource<Customer>;

  constructor(
    public helperService: HelperService,
    readonly store: Store,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.subscriptionCustomer = this.customers$.subscribe(customers => {
      if (!customers || customers.length === 0) {
        this.store.dispatch(new ListCustomers());
        return;
      }
      this.DATA = customers;
      this.dataSource = new MatTableDataSource<Customer>(this.DATA);
    });
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialog, {
      width: '350px',
      data: { id }
    });
  }

  deleteCustomer(data: { id: number }) {
    this.dialog.closeAll();
    if (!data.id) {
      return;
    }
    this.store.dispatch(new DeleteCustomer(data.id));
  }

  ngOnDestroy() {
    if (this.subscriptionCustomer) {
      this.subscriptionCustomer.unsubscribe();
    }
    if (this.subscriptionDeleteDialog) {
      this.subscriptionDeleteDialog.unsubscribe();
    }
  }
}
