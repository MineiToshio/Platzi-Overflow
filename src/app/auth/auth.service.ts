import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import urljoin from 'url-join';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService {
  userUrl: string
  currentUser?: User;

  constructor(private http: Http, public snackBar: MatSnackBar) {
    this.userUrl = urljoin(environment.apiUrl, 'auth');
    if(this.isLoggedIn()) {
      const { userId, firstName, lastName, email } = JSON.parse(localStorage.getItem('user'));
      this.currentUser = new User(email, null, firstName, lastName, userId);
    }
  }

  signup(user: User) {
    const body = JSON.stringify(user)
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(urljoin(this.userUrl, 'signup'), body, { headers })
      .pipe(
        map((response: Response) => {
          const json = response.json();
          this.login(json);
          return json;
        }),
        catchError((error: Response) => {
          console.log(error);
          return throwError(error.json());
        })
      );
  }

  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(urljoin(this.userUrl, 'signin'), body, { headers })
      .pipe(
        map((response: Response) => {
          const json = response.json();
          this.login(json);
          return json;
        }),
        catchError((error: Response) => {
          console.log(error);
          return throwError(error.json());
        })
      );
  }

  login = ({ token, userId, firstName, lastName, email }) => {
    this.currentUser = new User(email, null, firstName, lastName, userId);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ userId, firstName, lastName, email }));
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  logout = () => {
    localStorage.clear();
    this.currentUser = null;
  }

  showError = (message) => {
    this.snackBar.open(message, 'x', { duration: 2500 });
  }

  public handleError = (error: any) => {
    const { error: { name }, message } = error;

    if(name === 'TokenExpiredError')
      this.showError('Tu sesión ha expirado');
    else if (name === 'JsonWebTokenError')
      this.showError('Ha habido un problema con tu sesión. Por favor, vuelva a iniciar sesión.');
    else
      this.showError(message || 'Ha ocurrido un error. Inténtalo nuevamente.');

    this.logout();
  }
}
