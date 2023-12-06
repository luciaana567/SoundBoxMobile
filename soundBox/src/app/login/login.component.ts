import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin, Itoast } from '@interfaces';
import { LoadingController, ToastController } from '@ionic/angular';
import { LoginService } from '@services';
import { AbstractService } from 'app/core/services/abstract.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPassword = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private abstractService: AbstractService,
    private service: LoginService,
    private loadingController: LoadingController
  ) {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

  async presentToast(data: Itoast) {
    const toast = await this.toastController.create({
      ...data,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Carregando...',
      duration: 500,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  changeShowPassword() {
    this.showPassword = !this.showPassword;
  }

  async logForm() {
    if (this.form.invalid) {
      await this.presentToast({
        message: 'erro de validação',
        color: 'danger',
      });
    } else {
      const value = {
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value,
      };
      this.login(value);
    }
  }

  async login(value: ILogin) {
    this.service.login(value).subscribe(
      (succ) => {
        this.service.saveToken(succ.token);
        this.setId(value);
      },
      async (err: HttpErrorResponse) =>
        await this.presentToast({
          message: 'erro de validação',
          color: 'danger',
        })
    );
  }

  async setId(value: ILogin) {
    this.service.getUser(value).subscribe(
      (succ) => {
        this.service.setUser(succ);
        this.router.navigateByUrl('/tabs/tab1', {
          state: { pageOrigem: null },
        });
      },
      async (err: HttpErrorResponse) =>
        await this.presentToast({
          message: 'erro de validação',
          color: 'danger',
        })
    );
  }

  register() {
    this.router.navigateByUrl('/register');
  }
}
