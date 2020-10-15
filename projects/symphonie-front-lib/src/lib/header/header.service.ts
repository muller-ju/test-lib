import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {

  constructor(private http: HttpClient) {
  }

  getProposition(idProposition: string) {
    return this.http.get(`tempo-api/api/propositions/${idProposition}`);
  }

  getContrat(numeroJuridique: string) {
    return this.http.get(`tempo-api/api/contrats/${numeroJuridique}`);
  }
}
