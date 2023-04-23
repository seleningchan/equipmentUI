import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Equipment } from '../models/equipment';
import { EquipmentService } from '../services/equipment.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private location: Location, 
    private equipmentService: EquipmentService) { }

  equipment: Equipment;  

  ngOnInit(): void {
    this.getDetail();
  }

  getDetail(): void{
    const id = this.route.snapshot.paramMap.get('id');
    this.getEquipment(id);
  }

  getEquipment(id: string): void {
    this.equipmentService.getEquipment(id)
    .subscribe(equipment => this.equipment = equipment);;
  }

  save(): void {
    this.equipmentService.updateEquipment(this.equipment)
        .subscribe(() => {
        alert('update success');
        //this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }

}
