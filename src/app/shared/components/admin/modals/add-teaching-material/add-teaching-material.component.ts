import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-add-teaching-material',
  templateUrl: './add-teaching-material.component.html',
  styleUrls: ['./add-teaching-material.component.scss']
})
export class AddTeachingMaterialComponent implements OnInit {

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

}
