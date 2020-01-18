import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { ListComponent } from './list/list.component';
import { CustomerComponent } from './customer/customer.component';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { HelperService } from '../shared/services/helper.service';


@NgModule({
  declarations: [
    ListComponent,
    CustomerComponent,
    MainComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
  ],
  providers: [
    HelperService
  ]
})
export class CustomerModule { }
