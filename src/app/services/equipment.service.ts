import { Injectable } from '@angular/core';
import { Equipment } from '../models/equipment';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private equimentUrl = 'http://localhost:8000/equipments';

  constructor(private http: HttpClient) { }

  getEquipmentList(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.equimentUrl).pipe(
      catchError(this.handleError<Equipment[]>('getEquipmentList', [])));
  }

  getEquipment(id: string): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.equimentUrl}/${id}`).pipe(
      catchError(this.handleError<Equipment>('getEquipmentList', null)));
  }

  updateEquipment(equipment: Equipment): Observable<any> {
    return this.http.put(`${this.equimentUrl}/${equipment.id}`, equipment, httpOptions).pipe(
      catchError(this.handleError<Equipment>(`updateEquipment is ${equipment.id}`))
    )
  }

  addEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(this.equimentUrl, equipment, httpOptions).pipe(
      catchError(this.handleError<Equipment>('Add equipment'))
    );
  }

  deleteEquipment(equipment: Equipment): Observable<Equipment> {
    const id = equipment.id;
    const url = `${this.equimentUrl}/${id}`;
    return this.http.delete<Equipment>(url, httpOptions).pipe(
      catchError(this.handleError<Equipment>(`delete equipment ${id}`))
    );
  }

  isDate(dateString: string): boolean {
    if (dateString.trim() == "") return true;
    var r = dateString.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) {
      alert("please enter date like yyyy-mm-dd");
      return false;
    }
    return true;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      alert(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
