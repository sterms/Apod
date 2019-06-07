import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NasaService {

  public readonly CallLimitHeader = 'X-RateLimit-Limit';

  public readonly RemainingCallsHeader = 'X-RateLimit-Remaining';

  private readonly baseUrl: string;

  private readonly apiKey: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.apiUrl;
    this.apiKey = environment.apiKey;
  }

  // Sets up the call to Nasa's Open API
  public getApod(date: Date): Observable<HttpResponse<NasaResponse>> {
    const datePipe = new DatePipe('en-US');
    const params = new HttpParams().set('api_key', this.apiKey).set('date', datePipe.transform(date, 'yyyy-MM-dd')).set('hd', 'true');

    return this.httpClient.get<NasaResponse>(
      `${this.baseUrl}/planetary/apod?${params.toString()}`, { observe: 'response' }
    );
  }
}

export interface NasaResponse {
  copyright: string;
  date: Date;
  explanation: string;
  title: string;
  url: string;
  hdurl: string;
  media_type: string;
}

