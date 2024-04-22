import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { Production } from '../interfaces/production';

@Injectable({
  providedIn: 'root',
})
export class ImdbService {
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    //header build
    this.headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Authorization', `Bearer ${environment.acessToken}`);
  }

  ///Get movies currently on theatres
  getNowPlaying(): Observable<{ results: Production[] }> {
    return this.httpClient.get<{ results: Production[] }>(
      `${environment.baseUrl}/movie/now_playing?api_key=${environment.apiKey}&language=pt-BR`,
      { headers: this.headers }
    );
  }

  getPopularSeries(): Observable<{ results: Production[] }> {
    return this.httpClient.get<{ results: Production[] }>(
      `${environment.baseUrl}/tv/popular?api_key=${environment.apiKey}&language=pt-BR`,
      { headers: this.headers }
    );
  }

  getTrendingMovies(
    time_window: string
  ): Observable<{ results: Production[] }> {
    return this.httpClient.get<{ results: Production[] }>(
      `${environment.baseUrl}/trending/movie/${time_window}?api_key=${environment.apiKey}&language=pt-BR`
    );
  }
}
