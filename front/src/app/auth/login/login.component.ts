import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.error = '';
    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/os']);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401) {
          this.error = 'E-mail ou senha inválidos';
        } else {
          this.error = 'Erro ao conectar com o servidor';
          console.error('Erro de login:', err);
        }
      }
    });
  }
}
