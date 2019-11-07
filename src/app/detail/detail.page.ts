import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from '../models/estudiante';

import { EstudianteService } from "../services/estudiante.service";
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  student: Estudiante;

  constructor(private service:EstudianteService, 
    private route: ActivatedRoute, 
    private router: Router,
    public toastController: ToastController) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.student =  JSON.parse(params.special) as Estudiante;
        console.log(this.student);
      }
    });
  }

  ngOnInit() {
  }

  async delete(id:string) {
      this.service.deleteStudent(id);
      this.presentToast();
      this.router.navigate(['/']);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tarea eliminada',
      duration: 2000
    });
    toast.present();
  }

}
