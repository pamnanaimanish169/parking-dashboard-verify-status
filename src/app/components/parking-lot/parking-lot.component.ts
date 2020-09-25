import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-parking-lot',
  templateUrl: './parking-lot.component.html',
  styleUrls: ['./parking-lot.component.css']
})
export class ParkingLotComponent implements OnInit {
  @Input() id;

  constructor() { }

  ngOnInit(): void {
    this.getParkingLot(this.id);
  }

  getParkingLot(id) {

  }

}
