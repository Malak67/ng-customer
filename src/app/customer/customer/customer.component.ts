import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../appStore/app.store';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Customer } from '../../models/customer.model';
import { Select, Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { CreateCustomer, GetCustomer, EditCustomer } from '../../appStore/app.actions';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  disabledSubmit = false;
  currentlyThere = false;
  customerSub: Subscription;
  editingCustomer: Customer;

  @Select(AppState.editingCustomer) editingCustomer$: Observable<Customer>;

  constructor(
    private store: Store,
    readonly route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initForm();
    this.route.params
      .subscribe((param) => {
        this.store.dispatch(new GetCustomer(+param.id));
      });
    this.customerSub = this.editingCustomer$.subscribe((customer: Customer) => {
      this.editingCustomer = customer;
      this.patchForm();
    });
    this.onChanges();
  }

  patchForm() {
    if (this.editingCustomer) {
      this.formGroup.patchValue({
        firstName: this.editingCustomer.firstName,
        lastName: this.editingCustomer.lastName,
        email: this.editingCustomer.email,
        phoneNumber: this.editingCustomer.phoneNumber,
      });
    }
    this.disabledSubmit = true;
  }

  initForm() {
    this.formGroup = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required]],
      },
    );
  }

  onChanges(): void {
    this.formGroup.valueChanges.subscribe(val => {
      if (this.editingCustomer) {
        if (
          val.firstName !== this.editingCustomer.firstName ||
          val.lastName !== this.editingCustomer.lastName ||
          val.email !== this.editingCustomer.email ||
          val.phoneNumber !== this.editingCustomer.phoneNumber
        ) {
          this.disabledSubmit = false;
        }
      } else if (this.formGroup.valid) {
        this.disabledSubmit = false;
      }
    });
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      return;
    }
    const customer: Customer = {
      firstName: this.formGroup.value.firstName,
      lastName: this.formGroup.value.lastName,
      email: this.formGroup.value.email,
      phoneNumber: this.formGroup.value.phoneNumber,
    };
    if (this.editingCustomer) {
      customer.id = this.editingCustomer.id;
      this.store.dispatch(new EditCustomer(customer));
    } else {
      this.store.dispatch(new CreateCustomer(customer));
    }
  }

  ngOnDestroy() {
    if (this.customerSub) {
      this.customerSub.unsubscribe();
    }
  }

}
