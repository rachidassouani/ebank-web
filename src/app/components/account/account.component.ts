import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountDetails } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(
    private formBuilder : FormBuilder, 
    private accountService: AccountService) { }

  accountsFormGroup!: FormGroup | undefined;
  account! : AccountDetails | undefined;
  operationsFormGroup!: FormGroup | undefined;

  ngOnInit(): void {
    this.accountsFormGroup = this.formBuilder.group({
      id : this.formBuilder.control(""),
      name : this.formBuilder.control(""),
      email : this.formBuilder.control("")
    })

    this.operationsFormGroup = this.formBuilder.group({
      amount : this.formBuilder.control(0, [Validators.required]),
      description : this.formBuilder.control(null, [Validators.required]),
      operationType : this.formBuilder.control(null, [Validators.required]),
      accountDestination : this.formBuilder.control(null)
    })
  }

  onSearchAccount() {
    const accountId = this.accountsFormGroup?.value.id;
    this.accountService.findAccountById(accountId).subscribe({
      next : (data) => {
        this.account = data;
        console.log(data);
        
      
      }, error : (error) => {
        alert('error')
        this.account = undefined;
      }
    })
  }

  onSaveOperation() {
    const accountId : number = this.accountsFormGroup?.value.id;
    const operationType : string = this.operationsFormGroup?.value.operationType;
    const amount : number = this.operationsFormGroup?.value.amount;
    const description : string = this.operationsFormGroup?.value.description;

    if (operationType==='DEBIT') { 
      this.accountService.debit(accountId, amount, description).subscribe({
        next : (data) => {
          alert("DEBIT with success")
          this.onSearchAccount();
          this.operationsFormGroup?.reset();
        }, error : (error) => {
          console.log(error);
        }
      });

    } else if(operationType==='CREDIT') {
      this.accountService.credit(accountId, amount, description).subscribe({
        next : () => {
          alert("CREDIT with success")
          this.onSearchAccount();
          this.operationsFormGroup?.reset();
        }, error : (error) => {
          console.log(error);
        }
      });

    } else if (operationType==='TRANSFER') {
      const accountIdDestination = this.operationsFormGroup?.value.accountDestination;
      this.accountService.transfer(accountId, accountIdDestination, amount, description).subscribe({
        next : () => {
          alert("TRANSFER with success")
          this.onSearchAccount();
          this.operationsFormGroup?.reset();
        }, error : (error) => {
          console.log(error);
        }
      });
    }
  }
}
