import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Busqueda } from '../model/busqueda';

@Injectable({
  providedIn: 'root'
})
export class CochesService {

  cochesURL = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  marcas(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.cochesURL + 'marca/list');
  }

  coches(busqueda: Busqueda, page: number, size: number, order: string, asc: boolean): Observable<any[]> {
    return this.httpClient.post<any[]>(this.cochesURL + `coche/list?page=${page}&size=${size}&order=${order}&asc=${asc}`, busqueda);
  }
}
