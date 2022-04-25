import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public errorLogin:boolean = false;

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  
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
        this.authService.initAuthListener()
      })
      .catch((err) => {
        this.errorLogin = true;
      }); 

      
  }

}
