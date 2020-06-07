import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {NotificationService} from '../../shared/massages/snackbar/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from './user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  navigateTo: string;
  authorization: string;
  user: User;




  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });


    this.route
      .queryParams
      .subscribe(params => {
        this.authorization = params['authorization'];
        if (this.authorization) {
          console.log('buscar usuario:' + this.authorization);
          this.loginService.loginGoogle(this.authorization).subscribe(
            user => {
              this.user = user;
              console.log('redirecionar');
              this.router.navigate(['/home']);

            },
            error => {
              this.notificationService.notify(error.error);
            }, () => {

               }
          );
        }
      });

    // Redirecionamento
    // voltar para pagina q exige autenticação
    this.navigateTo = this.activatedRoute.snapshot.params['to' ] || btoa('/');



   const body = document.getElementsByTagName('body')[0];
    body.classList.add('full-screen');
    body.classList.add('register');
    const navbar = document.getElementsByTagName('nav')[0];
    /*navbar.classList.add('navbar-transparent');*/
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
    }
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('full-screen');
    body.classList.remove('register');
    /*var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');*/
  }

  login() {
    this.loginService.login(this.loginForm.value.email,
      this.loginForm.value.password).subscribe(user => {
          this.notificationService.notify(`Bem vindo, ${user.name}`);
          this.loginService.updateLocalStorge();
      },
      response => {
        localStorage.clear();
        this.notificationService.notify(response.error);
      },
      () => {


      }
      );
  }

  getMiniaturaPerfil(): string {
    return this.loginService.getMiniaturaPerfil();
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }

}
