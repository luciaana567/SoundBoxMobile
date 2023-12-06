import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import {
  AlertController,
  ModalController,
  ToastController,
  LoadingController,
} from '@ionic/angular';
import { AnyNaptrRecord } from 'dns';

@Injectable({
  providedIn: 'root',
})
export class AbstractService {
  constructor(
    public toastController: ToastController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public modalController: ModalController
  ) {}

  removeChartString(T: string): string {
    return T.replace(/[^\w\s]/gi, '');
  }

  /*
   * Present Toast simple with
   * message: string
   * duration?: number
   */
  async presentToast(message: string, duration = 2000): Promise<any> {
    var toastDimiss: Promise<any> | undefined = undefined;
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
    });
    toast.present();
    await toast.onDidDismiss().then((data: any) => {
      toastDimiss = data;
    });
    return toastDimiss;
  }

  /*
   * Present Modal simple with
   * component: any
   * data?: {any}
   */
  async presentModal(component: any, data?: any): Promise<any> {
    let modalDimiss: Promise<any> | undefined = undefined;
    const modal = await this.modalController.create({
      component: component,
      componentProps: { data: data },
    });

    modal.present();
    await modal.onDidDismiss().then((data: any) => {
      modalDimiss = data;
    });
    return modalDimiss;
  }

  /*
   * Present Alert simple with
   * header: string
   * message: string
   * subHeader: string
   * textButton: string
   * cssClass: string
   */
  async presentAlert(
    header: string,
    message: string,
    textButton: string,
    subHeader = '',
    cssClass = ''
  ): Promise<any> {
    let alertDimiss: Promise<any> | undefined = undefined;
    const alert = await this.alertController.create({
      cssClass: cssClass,
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [textButton],
    });

    alert.present();
    await alert.onDidDismiss().then((data: any) => {
      alertDimiss = data;
    });
    return alertDimiss;
  }

  /**
   * Present Alert simple with
   * message: string
   * duration: number
   * cssClass: string
   */
  async presentLoading(message: string, duration = 0, cssClass = '') {
    let loadingDimiss;
    const loading = await this.loadingController.create({
      cssClass: cssClass,
      message: message,
      // duration: duration
    });

    loading.present();
    await loading.onDidDismiss().then((data) => {
      loadingDimiss = data;
    });
    return loadingDimiss;
  }

  checkValidatorInput(formControl: FormControl) {
    return (
      formControl.hasError('required') &&
      (formControl.dirty || formControl.touched)
    );
  }
}
