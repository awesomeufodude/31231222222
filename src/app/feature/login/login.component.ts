import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginFormComponent, LoginData } from '../../core/components/login-form/login-form.component';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  handleLogin(data: LoginData) {
    const token = this.generateFakeToken(data.rut);
    this.authService.login(token);
    this.router.navigate(['/comercios']);
  }

  private generateFakeToken(rut: string): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({
        sub: rut,
        rut: rut,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      })
    );
    const signature = btoa('secret');
    return `${header}.${payload}.${signature}`;
  }
}