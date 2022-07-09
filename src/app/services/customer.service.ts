import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient : HttpClient) { }

  allCustomersUrl = `${environment.backendLocalHost}/api/v1/customers`;

  public findAllCustomers() : Observable<Array<Customer>> {
    return this.httpClient.get<Array<Customer>>(this.allCustomersUrl);
  }

  public findCustomersByName(name : string) : Observable<Array<Customer>> {
    return this.httpClient.get<Array<Customer>>(`${this.allCustomersUrl}/search?name=${name}`);
  }

  public saveCustomer(customer : Customer) : Observable<Customer> {
    return this.httpClient.post<Customer>(this.allCustomersUrl, customer);
  }

  public deleteCustomer(customerId : number) {
    return this.httpClient.delete(`${this.allCustomersUrl}/${customerId}`);
  }
}

