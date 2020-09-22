import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  result = [];
  newFromDate;
  newToDate;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.firestore.collection('parkingTransactions').get().toPromise().then((res) => {
      console.log(res)
      res['docs'].forEach((element, key) => {
        if(element['xf'] != undefined) {
          this.result.push(element['xf']['nn']['proto']['mapValue']['fields'])
        }
      })
      console.log(this.result)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  addEventFrom(string, event) {
    let d = new Date(event.value);
    this.newFromDate = d.getFullYear() + '-' + ('0'+ (parseInt(d.getMonth().toString()) + 1)) + '-' + d.getDate();
    console.log(this.newFromDate)
  }

  addEventTo(string,event) {
    let d = new Date(event.value);
    this.newToDate = d.getFullYear() + '-' + ('0'+(parseInt(d.getMonth().toString()) + 1)) + '-' + d.getDate();
    console.log(this.newToDate)
  }

  submit() {
    this.firestore.collection('parkingTransactions').get().toPromise().then((res) => {
      console.log(res)
      res['docs'].forEach((element, key) => {
        if(element['xf']['nn']['proto']['mapValue']['fields']['entryTimestamp']['timestampValue'] != undefined && element['xf']['nn']['proto']['mapValue']['fields']['exitTimestamp']['timestampValue'] != undefined && element['xf']['nn']['proto']['mapValue']['fields']['exitTimestamp']['nullValue'] != null) {
          if(new Date(element['xf']['nn']['proto']['mapValue']['fields']['entryTimestamp']['timestampValue']).getTime() > new Date(this.newFromDate).getTime() && new Date(element['xf']['nn']['proto']['mapValue']['fields']['exitTimestamp']['timestampValue']).getTime() < new Date(this.newToDate).getTime()) {
            this.result.push(element['xf']['nn']['proto']['mapValue']['fields'])
          }
        }
      })
      console.log(this.result)
    })
    .catch((error) => {
      console.log(error)
    })
  }

}
