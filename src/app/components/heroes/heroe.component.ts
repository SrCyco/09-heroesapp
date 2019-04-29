import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Heroe } from 'src/app/interfaces/heroe.interface';
import { HeroesService } from 'src/app/services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe:Heroe = {
    nombre: '',
    bio: '',
    casa: 'Marvel'
  };

  nuevo: boolean = false;
  id: string = '';

  constructor(private heroesService: HeroesService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id'];
      if (this.id !== 'nuevo'){
        this.heroesService.getHeroe( this.id ).subscribe( (heroe: Heroe) => this.heroe = heroe);
      }
    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log(this.id);

    if (this.id === 'nuevo') {
      this.heroesService.nuevoHeroe(this.heroe).subscribe(data => {
        console.log('data', data['name']);
        this.router.navigate(['/heroe', data['name']]);
      },
        error => console.log(error));

    } else {
      this.heroesService.actualizarHeroe(this.heroe, this.id).subscribe(data => {
        console.log(data);
      },
        error => console.log(error));
    }
  }

  agregarNuevo( forma:NgForm ) {
    this.router.navigate(['/heroe', 'nuevo']);
    forma.reset({
      casa: 'Marvel'
    });
  }

}
