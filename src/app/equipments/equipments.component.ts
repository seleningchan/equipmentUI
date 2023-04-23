import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Equipment } from '../models/equipment';
import { Location } from '@angular/common';
import { EquipmentService } from '../services/equipment.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {
  @Input() equipment: Equipment;
  @Output()
  change = new EventEmitter()

  constructor(private equipmentService: EquipmentService, private location: Location) { }

  ngOnInit(): void {
  }

  delete(equipment: Equipment): void {
    if(confirm("Are you sure to delete")) {
      this.equipmentService.deleteEquipment(equipment)
      .subscribe(re => {
        alert(`delete equipment ${equipment.id} success`);
        this.change.emit(equipment);
      });
    }
  }
}
