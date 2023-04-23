import { Component, OnInit } from '@angular/core';
import { Equipment } from '../models/equipment';
import { EquipmentService } from '../services/equipment.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  maxId: string = '';
  equipment: Equipment = {
    id: '',
    model: '',
    brand: '',
    weight: '',
    manufactureDate: ''
  };

  constructor(private equipmentService: EquipmentService, private location: Location) { }

  ngOnInit(): void {
    this.equipmentService.getEquipmentList()
      .subscribe(equipments => {
        this.maxId = equipments.reduce((item, curr) => {
          return item.id < curr.id ? curr : item;
        }).id;
      });

    console.log("max id is " + this.maxId)
  }

  add(equipment: Equipment): void {
    if(this.equipmentService.isDate(equipment.manufactureDate)){
    equipment.id = this.setMaxId(this.maxId);
    equipment.model = equipment.model.trim();
    equipment.brand = equipment.brand.trim();
    equipment.weight = equipment.weight.trim();
    this.equipmentService.addEquipment(equipment)
      .subscribe(equipment => {
        alert(`add equipment ${equipment.model} success`);
        this.location.back();
      });
    }
  }

  setMaxId(id: string): string {
    var eqnumber = id.split(':');
    return `${eqnumber[0]}:` + this.pad(parseInt(eqnumber[1]) + 1, 3);
  }

  pad(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

}
