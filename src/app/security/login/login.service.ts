import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SICA_API, SICA_API_SEG} from '../../app.api';
import {User} from './user.model';
import {NavigationEnd, Router} from '@angular/router';
import {tap, filter} from 'rxjs/operators';
import {Utility} from '../../shared/utility.service';
import {Conta} from '../../shared/models/conta.model';
import { of } from 'rxjs';

@Injectable()
export class LoginService {
  user: User;
  lastUrl: string;

  isLoogedIn(): boolean {
    this.user = this.getUser();
    return this.user != null;
  }


  constructor (private http: HttpClient, private router: Router, private utility: Utility) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.lastUrl = e.url;
      });
  }

  getUser(): User {
    this.user = JSON.parse(localStorage.getItem('user' ));
    return this.user;
  }

  atualizaImagem(imagem: string) {
    this.user.picture = imagem;
    this.updateLocalStorge();
  }

  getMiniaturaPerfil() {
    return this.utility.getMiniaturaPerfil(this.user.picture);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${SICA_API}/Auth/LogIn`,
      {userName: email, password: password}).pipe(
        tap(user => this.user = user,
            error => console.log(error),
          () => this.updateLocalStorge() ));
  }

  loginGoogle(authorization: string): Observable<Conta> {
    return this.http.get<Conta>(`${SICA_API_SEG}/_user`, {headers: {'Authorization': `${authorization}`}}).pipe(
      tap(user => this.user = user,
        error => console.log(error),
        () => this.updateLocalStorge() ));
  }


  updateLocalStorge() {
    localStorage.setItem('user',  JSON.stringify(this.user));
  }

  handleLogin(path: string = this.lastUrl) {
    this.router.navigate(['/login', btoa(path)]);
  }


  logout() {
    localStorage.clear();
    this.user = undefined;
    this.router.navigate(['/login']);
  }

  getRoute () {
    this.router.getCurrentNavigation();
  }

}
