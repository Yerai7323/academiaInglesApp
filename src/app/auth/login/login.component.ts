import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  public cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
  }

  loginUsuario() {
    if (this.loginForm.invalid) {
      return;
    }

  }

}
