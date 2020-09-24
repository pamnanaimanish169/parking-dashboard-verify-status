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
  fromDate;
  toDate;

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

  
  // table.component.ts (parking-dashboard) line 42 (filterByDate())
  submit() {
    this.result = [];
    let start = new Date(this.fromDate.toString());
    let end = new Date(this.toDate.toString()).toISOString();

    console.log(start)
    console.log(end)

    let result = this.firestore.collection('parkingTransactions', ref => ref
    .where('entryTimestamp', '>=', start)
    )

    console.log(result)

    result.get().subscribe(res => {
      console.log(res)
      let elementArray = [];
      res['docs'].forEach((element, key) => {
        console.log(element['xf']['nn']['proto']['mapValue']['fields']['exitTimestamp']['timestampValue'])
        console.log(end)
        console.log(element['xf']['nn']['proto']['mapValue']['fields']['exitTimestamp']['timestampValue'] <= end)
        if (element['xf']['nn']['proto']['mapValue']['fields']['exitTimestamp']['timestampValue'] <= end) {
          this.result.push(element['xf']['nn']['proto']['mapValue']['fields'])
        }
      })
    })

    console.log(this.result)
  }

  getFromDate(event) {
    console.log(event.target.value)
    this.fromDate = event.target.value;
  }

  getToDate(event) {
    console.log(event.target.value)
    this.toDate = event.target.value;
  }

}
