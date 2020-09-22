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

}
