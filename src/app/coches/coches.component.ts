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

  // paginator variables
  totalPages: Array<number>;
  page = 0;
  size = 6;
  order = '';
  orderAscOrDesc = '';
  asc = true;

  isFirst = false;
  isLast = false;

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
    this.cochesService.coches(this.busqueda, this.page, this.size, this.order, this.asc).subscribe(
      data => {
        this.coches = data['content'];
        this.isFirst = data['first'];
        this.isLast = data['last'];
        this.totalPages = new Array(data['totalPages']);
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
    // paginator reset
    this.page = 0;
    this.size = 6;
    this.order = '';
    this.asc = true;
    this.isFirst = false;
    this.isLast = false;
    this. orderAscOrDesc = '';
    this.listaCoches();
  }

  // paginator methods

  rewind(): void {
    if (!this.isFirst) {
      this.page--;
      this.listaCoches();
    }
  }

  forward(): void {
    if (!this.isLast) {
      this.page++;
      this.listaCoches();
    }
  }

  setPage(page: number): void {
    this.page = page;
    this.listaCoches();
  }

  setOrder(): void {
    switch (this.orderAscOrDesc) {
      case 'marcaAsc':
        this.order = 'marca';
        this.asc = true;
        break;
      case 'marcaDesc':
        this.order = 'marca';
        this.asc = false;
        break;
      case 'modeloAsc':
        this.order = 'modelo';
        this.asc = true;
        break;
      case 'modeloDesc':
        this.order = 'modelo';
        this.asc = false;
        break;
      case 'versionAsc':
        this.order = 'version';
        this.asc = true;
        break;
      case 'versionDesc':
        this.order = 'version';
        this.asc = false;
        break;
      case 'cambioAsc':
        this.order = 'cambio';
        this.asc = true;
        break;
      case 'cambioDesc':
        this.order = 'cambio';
        this.asc = false;
        break;
      case 'colorAsc':
        this.order = 'color';
        this.asc = true;
        break;
      case 'colorDesc':
        this.order = 'color';
        this.asc = false;
        break;
      case 'kmAsc':
        this.order = 'km';
        this.asc = true;
        break;
      case 'kmDesc':
        this.order = 'km';
        this.asc = false;
        break;
      default:
        break
    }
    this.listaCoches();
  }


}
