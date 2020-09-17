import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private db: AngularFireDatabase, private firestore: AngularFirestore) { }

  addPL(pl) {
    this.firestore.collection('parkingLots').doc(pl.id).set(pl).then((res) => {
      console.log('REPOSEN FROM Firebase server', res)
      return res;
    })
    .catch((error) => {
      console.log('Error from Firebase server', error)
    })
  }

  getAllPL() {
    this.firestore.collection('parkingLots').get().subscribe(res => {
      console.log('RESPONSE' , res);
    })
  }
}
