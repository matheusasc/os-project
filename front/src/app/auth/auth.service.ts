import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

interface LoginResponse {
  access_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/auth';
  private tokenKey = 'jwt_token';
  private authStatus = new BehaviorSubject<boolean>(false);
  private isBrowser: boolean;

  isAuthenticated$ = this.authStatus.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    if (this.isBrowser && this.getToken()) {
      this.authStatus.next(true);
    }
  }

  login(email: string, password: string): Observable<{access_token: string}> {
    const loginData = {
      username: email,
      password: password
    };

    return this.http.post<{access_token: string}>(
      `${this.apiUrl}/token`,
      loginData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    ).pipe(
      tap(response => {
        localStorage.setItem('jwt_token', response.access_token);
      })
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem('currentUser');
    }

    this.authStatus.next(false);

    this.router.navigate(['/login'], {
      queryParams: { logout: 'true' },
      replaceUrl: true
    });
  }
  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem(this.tokenKey) : null;
  }

  isAuthenticated(): boolean {
    return this.isBrowser && !!this.getToken();
  }

  getAuthHeader(): { [header: string]: string } {
    return {
      'Authorization': `Bearer ${this.getToken()}`
    };
  }
}
