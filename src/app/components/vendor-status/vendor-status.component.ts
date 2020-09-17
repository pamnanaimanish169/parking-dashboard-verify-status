import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-vendor-status',
  templateUrl: './vendor-status.component.html',
  styleUrls: ['./vendor-status.component.css']
})
export class VendorStatusComponent implements OnInit {
  result = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getAllVendors()
  }

  getAllVendors() {
    this.firestore.collection('vendors').get().subscribe(res => {
      res['docs'].forEach((element, key) => {
        this.result.push(element)
      })
    })
    console.log(res)
  }

}
