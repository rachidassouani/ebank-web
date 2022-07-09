import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NewCustomerComponent } from './components/new-customer/new-customer.component';

const routes: Routes = [
  {path: "customers", component: CustomerComponent},
  {path: "newCustomer", component: NewCustomerComponent},
  {path: "accounts", component: AccountComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
