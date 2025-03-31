import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { OsService } from '../os.service';
import { OrderService } from '../../shared/models/os.model';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-os-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './os-list.component.html',
  styleUrls: ['./os-list.component.scss']
})
export class OsListComponent implements OnInit {
  orders: OrderService[] = [];
  loading = true;

  constructor(
    private osService: OsService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.osService.getOrders().subscribe(
      orders => {
        this.orders = orders;
        this.loading = false;
      },
      error => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  createNewOrder(): void {
    this.router.navigate(['/os/new']);
  }

  viewOrder(orderId: number): void {
    this.router.navigate(['/os', orderId]);
  }

  getStatusBadgeClass(status: string): string {
    const statusMap: {[key: string]: string} = {
      'open': 'open',
      'in_progress': 'in_progress',
      'completed': 'completed'
    };
    return statusMap[status] || 'secondary';
  }

}
