import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { OrderService, ChecklistItem } from '../shared/models/os.model';

@Injectable({
  providedIn: 'root'
})
export class OsService {
  private apiUrl = 'http://localhost:8000/api/os';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  getOrders(): Observable<OrderService[]> {
    return this.http.get<OrderService[]>(`${this.apiUrl}`, {
      headers: this.getHeaders()
    });
  }

  getOrder(id: number): Observable<OrderService> {
    return this.http.get<OrderService>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  createOrder(order: OrderService): Observable<OrderService> {
    return this.http.post<OrderService>(`${this.apiUrl}`, order, {
      headers: this.getHeaders()
    });
  }

  updateOrder(order: OrderService): Observable<OrderService> {
    return this.http.put<OrderService>(`${this.apiUrl}/${order.id}`, order, {
      headers: this.getHeaders()
    });
  }

  getDefaultChecklist(): ChecklistItem[] {
    return [
      { id: 1, description: 'Verificação de segurança', checked: false },
      { id: 2, description: 'Teste de funcionamento', checked: false },
      { id: 3, description: 'Limpeza do equipamento', checked: false }
    ];
  }
}
