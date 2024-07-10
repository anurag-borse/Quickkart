import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRating } from 'src/app/quickKart-interfaces/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = 'http://localhost:11990/api/rating/DisplayAllReviewDetailsByEmailId'; 

  constructor(private http: HttpClient) { }

  getRatings(emailId: string): Observable<IRating[]> {
    return this.http.get<IRating[]>(`${this.apiUrl}?emailId=${emailId}`);
  }
}
