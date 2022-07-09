import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(
    private customerService : CustomerService,
    private formBuilder : FormBuilder) { }

  customers: Array<Customer> | undefined;
  errorMessage: string | undefined;
  searchCustomersFormGroup!: FormGroup | undefined;


  ngOnInit(): void {
    this.searchCustomersFormGroup = this.formBuilder.group({
      name: this.formBuilder.control("")
    });
    this.onSearchForCustomers();
  }

  onSearchForCustomers() {
    const keyWordName = this.searchCustomersFormGroup?.value.name;
    this.customerService.findCustomersByName(keyWordName).subscribe({
      next : (data) => {
         this.customers = data;
      }, error : (err) => {
          console.log(err.message);
          this.errorMessage = err.message;
      }
    })
  }

  onDeleteCustomer(customer: Customer) {
    let conf = confirm('Are you sure you want to delete');
    if (!conf) return;

    const customerId = customer.id;
    this.customerService.deleteCustomer(customerId).subscribe({
      next : (data) => {
        alert("deleted")
        this.onSearchForCustomers();
      
      }, error : (error) => {
        console.log(error);
      }
    });
  }
}
