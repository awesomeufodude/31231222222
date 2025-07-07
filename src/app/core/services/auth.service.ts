import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private tokenKey = 'authToken'; // Clave para almacenar el token

  constructor(private router: Router) {}

  // Login: Guarda el token en localStorage o sessionStorage
  login(token: string): void {
    localStorage.setItem(this.tokenKey, token); // Cambia a sessionStorage si no necesitas persistir después de cerrar el navegador
    this.validateTokenExpiration();
  }

  // Logout: Borra el token del almacenamiento
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  // Obtener el token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Verifica si el token es válido y si ha expirado
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = this.decodeToken(token);
    if (!payload || Date.now() >= payload.exp * 1000) {
      this.logout();
      return false;
    }
    return true;
  }

  // Decodifica el payload del JWT (sin validar la firma)
  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (e) {
      return null;
    }
  }

  // Validar y cerrar sesión automáticamente si el token expira
  private validateTokenExpiration(): void {
    const token = this.getToken();
    if (!token) return;

    const payload = this.decodeToken(token);
    if (payload && payload.exp) {
      const expirationTime = payload.exp * 1000 - Date.now();
      setTimeout(() => this.logout(), expirationTime);
    }
  }
}