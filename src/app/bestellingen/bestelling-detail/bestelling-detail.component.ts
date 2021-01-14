import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bestelling } from 'src/app/shared/bestelling.model';

@Component({
  selector: 'app-bestelling-detail',
  templateUrl: './bestelling-detail.component.html',
  styleUrls: ['./bestelling-detail.component.css']
})
export class BestellingDetailComponent implements OnInit {
  @Input() bestelling: Bestelling;
  @Output() close = new EventEmitter<void>();
  @Output() upgradeState = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.close.emit();
  }

  upgradeStatus() {
    this.upgradeState.emit();
  }

  onCancel(){
    this.cancel.emit();
  }
}
