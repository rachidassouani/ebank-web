import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountDetails } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient : HttpClient) { }

  allAccountsUrl = `${environment.backendLocalHost}/api/v1/accounts`;

  findAccountById(id : number) : Observable<AccountDetails> {
    return this.httpClient.get<AccountDetails>(`${this.allAccountsUrl}/${id}/pageOperations`); 
  }

  debit(accountId: number, amount: number, description: string) {   
    const debitDTO = {accountId, amount, description};
    console.log(debitDTO);
    console.log(`${this.allAccountsUrl}/debit`);
    
    return this.httpClient.post(`${this.allAccountsUrl}/debit`, debitDTO); 
  }

  credit(accountId: number, amount: number, description: string) {   
    const creditDTO = {accountId, amount, description};
    console.log(creditDTO);
     
    return this.httpClient.post(`${this.allAccountsUrl}/credit`, creditDTO); 
  }

  transfer(idAccountSource: number, idAccountDestination: number, amount: number, description: string) {   
    const transferDTO = {idAccountSource, idAccountDestination, amount, description}; 
    console.log(transferDTO);
      
    return this.httpClient.post(`${this.allAccountsUrl}/transfer`, transferDTO); 
  }
}
