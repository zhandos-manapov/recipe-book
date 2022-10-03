import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm!: FormGroup
  error!: string

  isLoginMode = true
  isLoading = false

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSwitch() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return
    }

    const email = this.loginForm.value.email
    const password = this.loginForm.value.password

    this.isLoading = true

    let auth$: Observable<AuthResponseData>

    this.isLoginMode
      ? auth$ = this.authService.login(email, password)
      : auth$ = this.authService.signUp(email, password)

    auth$.subscribe(
      res => {
        console.log(res)
        this.isLoading = false
        this.router.navigate(['/recipes'])
      },
      err => {
        console.log(err)
        this.error = err
        this.isLoading = false
      }
    )

    this.loginForm.reset()
  }

}
