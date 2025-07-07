import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { InputFieldComponent } from '../inputs/input.component';
import { ButtonComponent } from "../button/button.component";

export interface LoginData {
  rut: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputFieldComponent, ButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Output() loginSubmit = new EventEmitter<LoginData>();

  form = new FormGroup({
    rut: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.form.valid) {
      this.loginSubmit.emit(this.form.value as LoginData);
    }
  }
}