import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { Production } from '../interfaces/production';

@Injectable({
  providedIn: 'root',
})
export class ImdbService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl: string = environment.baseUrl;

  ///Get movies currently on theatres
  getNowPlaying(): Observable<{ results: Production[] }> {
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Authorization', `Bearer ${environment.acessToken}`);
    return this.httpClient.get<{ results: Production[] }>(
      `${this.baseUrl}/movie/now_playing?api_key=${environment.apiKey}&language=pt-BR`,
      { headers }
    );
  }
}
