import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AsyncPipe, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private authService = inject(AuthService);
  isAuthenticated$ = this.authService.isAuthenticated$;
  isRouterActive = true;

  constructor(
    private router: Router) { }

  onLogout(): void {
    this.authService.logout();
  }

  createNewOrder(): void {
    this.isRouterActive = false;
    setTimeout(() => {
      this.isRouterActive = true;
      this.router.navigateByUrl('/os/new');
    }, 50);
  }

  private resetRouterOutlet(): void {
    this.isRouterActive = false;
    setTimeout(() => this.isRouterActive = true);
  }

}
