import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  objectKeys = Object.keys;
  form: FormGroup;
  list = [];
  total = {
    balance: 0,
    credited: 0,
    debited: 0
  };

  constructor(
    public mainService: MainService,
    public formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      type: ['LAST 30 DAYS'],
    });
  }

  ngOnInit(): void {
    this.changeType();
  }

  changeType() {
    console.log(this.form.get('type').value);
    this.loadData(this.form.get('type').value);
  }

  loadData(type) {
    console.log(type);
    this.mainService.getData(type)
      .subscribe((res)=> { 
        const {
          available_balance, total_tokens_credited,
          total_tokens_debited, transaction_records
        } = res.response;

        this.list = transaction_records;
        this.total = {
          balance: available_balance,
          credited: total_tokens_credited,
          debited: total_tokens_debited
        };
      }); 
  }
}
