import {Component, OnInit} from '@angular/core';

import {Utility} from '../../shared/utility.service';
import {Router} from '@angular/router';
import {ngxLoadingAnimationTypes} from 'ngx-loading';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import {NotificationService} from '../../shared/massages/snackbar/notification.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

declare let PagSeguroLightbox: any;

const PrimaryGreen = '#82C83C';
const SecondaryGrey = '#ccc';

@Component({
  selector: 'app-adm-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.scss']
})
export class ZonasComponent implements OnInit {

  // loading
  public loading = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = PrimaryGreen;
  public secondaryColour = SecondaryGrey;


  zonaForm: FormGroup;


  constructor(private router: Router,
              private utility: Utility,
              private fb: FormBuilder,
              private notificationService: NotificationService) {
  }

  ngOnInit() {

    this.zonaForm = new FormGroup({
      dsNome: this.fb.control('', [Validators.required, Validators.minLength(5)]),
    });
  }


}
