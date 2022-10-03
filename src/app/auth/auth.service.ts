import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError, tap, BehaviorSubject } from 'rxjs';
import { User } from './user.model';


export interface AuthResponseData {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registerd?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDN0XvGl8V3wNPniQ6YRUNrHrOsGIfhXv8'
  private signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDN0XvGl8V3wNPniQ6YRUNrHrOsGIfhXv8'
  private tokenExpirationTimer!: ReturnType<typeof setTimeout> | null;

  user$ = new BehaviorSubject<User | null>(null)


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signUpUrl, {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(this.handleAuth.bind(this))
      )
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signInUrl, {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(this.handleAuth.bind(this))
      )
  }

  autoLogin(){
    const user = JSON.parse(localStorage.getItem('userData')!)
    if(!user)
      return
    
    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpDate) 
    )

    if(loadedUser.token){
      this.user$.next(loadedUser)
      const expirationDate = new Date(user._tokenExpDate).getTime() - new Date().getTime()
      this.authLogout(expirationDate)
    }
  }

  logout() {
    this.user$.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
  }

  authLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration);
  }

  private handleAuth(res: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +res.expiresIn * 1000)
    const user = new User(
      res.email,
      res.localId,
      res.idToken,
      expirationDate
    )
    this.user$.next(user)
    this.authLogout(+res.expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = errorResponse.error.error.message
    return throwError(errorMessage)
  }
}
