import { Component, OnInit } from '@angular/core';
import { Equipment } from '../models/equipment';
import { EquipmentService } from '../services/equipment.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private equipmentService: EquipmentService) { }

  ngOnInit(): void {
    this.getEquipments();
  }

  equipments: Equipment[];

  getEquipments(): void{
    this.equipmentService.getEquipmentList()
    .subscribe(equipments => this.equipments = equipments);
  }

  funChange(equipment, $event){
    this.equipments = this.equipments.filter(h => h.id !== equipment.id);
  }
  
}
