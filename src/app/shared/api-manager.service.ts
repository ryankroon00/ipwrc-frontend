import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http/';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiManager {
    private readonly apiUrl = 'https://ryankroon.tk';
    //private readonly apiUrl = 'http://localhost:5001';
    private bearer: string;
    private headersList: HttpHeaders;

    constructor(private http: HttpClient){
       this.setHeaderList();
    }

    public setBearerToken(token: string): void{
        this.bearer = token;
    }

    public removeBearerToken(): void{
        this.createGetRequest('/user/logout').then(
            result => {}
        );
        this.bearer = null;
    }

    public createGetRequest(endPoint: string, params?: string): any{
        // setting bearer if its present
        if(this.bearer != null){
            this.headersList = this.headersList.append('Authorization', ["Bearer " + this.bearer]);
        } else {
            this.setHeaderList();
        }

        // checking if parrams should be addded
        if(params != null){
            return this.http.get(this.apiUrl + endPoint + '/' + params, {headers: this.headersList }).toPromise();
        } else {
            return this.http.get(this.apiUrl + endPoint, {headers: this.headersList}).toPromise();
        }
    }

    public createPostRequest(endPoint: string, data: string): any{
        if(this.bearer != null){
            this.headersList = this.headersList.append('Authorization', this.bearer);
        } else {
            this.setHeaderList();
        }
        
        return this.http.post(this.apiUrl + endPoint, data, {headers: this.headersList}).toPromise();
    }

    public createPutRequest(endPoint: string, data: string): any{
        if(this.bearer != null){
            this.headersList = this.headersList.append('Authorization', ["Bearer " + this.bearer]);
        } else {
            this.setHeaderList();
        }
        return this.http.put(this.apiUrl + endPoint, data, {headers: this.headersList}).toPromise();    
    }

    public createDeleteRequest(endPoint: string, params?: string): any{
        // setting bearer if its present
            if(this.bearer != null){
                this.headersList = this.headersList.append('Authorization', ["Bearer " + this.bearer]);
            } else {
                this.setHeaderList();
            }
        
            // checking if parrams should be addded
            if(params != null){
                return this.http.delete(this.apiUrl + endPoint + '/' + params, {headers: this.headersList }).toPromise();
            } else {
                return this.http.delete(this.apiUrl + endPoint, {headers: this.headersList}).toPromise();
            }
    }
    
    private setHeaderList(){
        this.headersList = new HttpHeaders();
        this.headersList = this.headersList.append('Content-Type', 'application/json');
        this.headersList = this.headersList.append('Access-Control-Allow-Origin', '*');
        this.headersList = this.headersList.append('responseType', 'json');
    }
}
