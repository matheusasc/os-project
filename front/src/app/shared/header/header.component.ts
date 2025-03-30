import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() newOrder = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  createNewOrder(): void {
    this.newOrder.emit();
  }

  doLogout(): void {
    this.logout.emit();
  }
}
