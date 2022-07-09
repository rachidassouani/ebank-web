import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  constructor(
    private formBuilder : FormBuilder, 
    private customerService: CustomerService,
    private router: Router) { }

  newCustomerFormGroup! : FormGroup | undefined;

  ngOnInit(): void {
    this.newCustomerFormGroup=this.formBuilder.group({
      name : this.formBuilder.control(null, [Validators.required, Validators.minLength(4)]),
      email : this.formBuilder.control(null,[Validators.required, Validators.email])
    });
  }

  onSaveCustomer() {
    let customer : Customer = this.newCustomerFormGroup?.value;
    this.customerService.saveCustomer(customer).subscribe({
      next : (data) => {
        alert("customer saved succfully");
        this.newCustomerFormGroup?.reset();
        this.router.navigateByUrl('/customers');
      }, error: (error) => {
        console.log(error);
      }
    });
  }
}
