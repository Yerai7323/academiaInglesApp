import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ListarUsuariosService } from 'src/app/services/listar-usuarios.service';
import Swal from 'sweetalert2';

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

  errorLogin:boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
  }


  loginUsuario() {
    if (this.loginForm.invalid) {
      return;
    }


    const { email, password } = this.loginForm.value;
    this.authService
      .loginUsuario(email, password)
      .then((login) => {
        this.router.navigate(['/home']);
        this.errorLogin = false;
      })
      .catch((err) => {
        this.errorLogin = true;
      });
  }

}
