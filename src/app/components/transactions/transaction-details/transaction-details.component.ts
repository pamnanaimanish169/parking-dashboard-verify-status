import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {
  id;
  result = [];
  editButtonClicked = false;
  discount;
  remarks;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private toastrService:ToastrService) {
    this.route.params.subscribe(param => {
      this.id = param['id'];
      console.log(this.id)
    })
   }

  ngOnInit(): void {
    this.getTransactionById(this.id);
  }

  getTransactionById(id) {
    let result = this.firestore.collection('parkingTransactions', ref => ref
    .where('id', '==' , id)
    )

    result.get().subscribe(res => {
      console.log(res)
      res['docs'].forEach((element, key) => {
        this.result.push(element['xf']['nn']['proto']['mapValue']['fields'])
      })
    })
    console.log(this.result)
  }

  onEdit() {
    const elements = document.getElementsByTagName('input');
    console.dir( elements )
    for(let i = 0; i < elements.length; i++) {
      console.dir(elements[i].readOnly)
      elements[i].readOnly = false;
    }
    const textarea = document.getElementsByTagName('textarea');

    for(let j = 0; j < textarea.length; j++) {
      textarea[j].readOnly = false;
    }
  }

  onSubmit(transaction) {
    console.log(this.discount);
    console.log(this.remarks)
    console.log(transaction)
    this.firestore.collection('parkingTransactions').doc(transaction['id']['stringValue']).set({
      addOnAmount: transaction['addOnAmount']['integerValue'],
      discountPercent: this.discount,
      remarks: this.remarks,
      entryTimestamp: transaction['entryTimestamp']['timestampValue'],
      exitTimestamp: transaction['exitTimestamp']['timestampValue'],
      id: transaction['id']['stringValue'],
      initPayment: transaction['initPayment']['integerValue'],
      isFree: transaction['isFree']['booleanValue'],
      parkingLotId: transaction['parkingLotId']['stringValue'],
      parkingType: transaction['parkingType']['stringValue'],
      prevBalanceAmount: transaction['prevBalanceAmount']['integerValue'],
      safetyCharges: transaction['safetyCharges']['integerValue'],
      secureOtp: transaction['secureOtp']['stringValue'],
      totalPayment: transaction['totalPayment']['integerValue'],
      updatedAt: transaction['updatedAt']['timestampValue'],
      vehicleMobileNo: transaction['vehicleMobileNo']['stringValue'],
      vehicleNo: transaction['vehicleNo']['stringValue'],
      vehicleType: transaction['vehicleType']['stringValue']
    }).then((res) => {
      console.log('Transaction updated successfully', res)
      this.toastrService.success('Transaction Updated successfully...')
      setTimeout(() => {
        location.reload()
      }, 3000);
    })
    .catch((error) => {
      console.log('Error in upating transaction', error)
      this.toastrService.error('Error in updating Transaction')
    })
  }

}
