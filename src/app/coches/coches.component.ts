import { Component, OnInit } from '@angular/core';
import { CochesService } from './coches.service';
import { Busqueda } from '../model/busqueda';

@Component({
  selector: 'app-coches',
  templateUrl: './coches.component.html',
  styleUrls: ['./coches.component.css']
})
export class CochesComponent implements OnInit {

  coches: any[] = [];
  marcas: any[] = [];
  marcaElegida: any = null;

  busqueda: Busqueda = {
    marca: '',
    modelo: '',
    version: '',
    cambio: '',
    color: '',
    kmDesde: null,
    kmHasta: null
  };

  constructor(private cochesService: CochesService) { }

  ngOnInit() {
    this.listaMarcas();
    this.listaCoches();
  }

  listaMarcas(): void {
    this.cochesService.marcas().subscribe(
      data => {
        this.marcas = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  listaCoches(): void {
    this.cochesService.coches(this.busqueda).subscribe(
      data => {
        this.coches = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  onChangeMarca(): void {
    if (this.marcaElegida) {
      this.busqueda.marca = this.marcaElegida.nombre;
    } else {
      this.busqueda.marca = '';
      this.busqueda.modelo = '';
    }
    this.listaCoches();
  }

  clearVersion(): void {
    this.busqueda.version = '';
    this.listaCoches();
  }

  clearKmDesde(): void {
    this.busqueda.kmDesde = null;
    this.listaCoches();
  }

  clearKmHasta(): void {
    this.busqueda.kmHasta = null;
    this.listaCoches();
  }

  clear(): void {
    this.marcaElegida = null;
    this.busqueda.marca = '';
    this.busqueda.modelo = '';
    this.busqueda.version = '';
    this.busqueda.cambio = '';
    this.busqueda.color = '';
    this.busqueda.kmDesde = null;
    this.busqueda.kmHasta = null;
    this.listaCoches();
  }
}
