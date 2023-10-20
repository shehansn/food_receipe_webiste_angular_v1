import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { ServerRes } from '../shared/models/ServerRes.model';
import { User } from '../shared/models/user.model';

const APIURL = 'http://localhost:9000/api/v1/user';
const registerUrl = APIURL + '/register';
const loginUrl = APIURL + '/login';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private userSubject = new BehaviorSubject<any>(this.getUserFromLocalStorage());
  public userObservable!: Observable<any>;

  constructor(
    private http: HttpClient,
      private toastrService: ToastrService
     ) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): any {
    return this.userSubject.value;
  }

  register(payload: object): Observable<ServerRes<User>> {
    return this.http.post<ServerRes<User>>(registerUrl, payload).pipe(
      tap({
        next: (serverRes) => {
          this.setUserToLocalStorage(serverRes.data);
          this.userSubject.next(serverRes.data);
          this.toastrService.success(
            `Welcome to the Foods Recipe Website`,
            'Register Successful'
          )
          location.replace("/user/login");
        },
        error: (errorResponse) => {
          if (errorResponse.statusText == 'Unknown Error') {
            this.toastrService.error('Unknown Server Error occured', 'Register Failed');
          } else {
            this.toastrService.error(errorResponse.error.message, 'Register Failed')

          }
        }
      })
    );
  }


  login(payload: object): Observable<ServerRes<User>> {
    return this.http.post<ServerRes<User>>(loginUrl, payload).pipe(
      tap({
        next: (serverRes) => {
          console.log('user login response from server', serverRes)
          this.setUserToLocalStorage(serverRes.data);
          this.userSubject.next(serverRes.data);
          this.toastrService.success(
            `Welcome to Foods Recipe Website !`,
            'Login Successful'
          )
          location.replace("/home");
        },
        error: (errorResponse) => {
          console.log(errorResponse)
          if (errorResponse.statusText == 'Unknown Error') {
            this.toastrService.error('Unknown Server Error occured', 'Login Failed');
          } else {
            this.toastrService.error(errorResponse.error.message, 'Login Failed');

          }
        }
      })
    );

  }

  getAllFavRecipes(userId:string):Observable<ServerRes<any>> {
    return this.http.get<ServerRes<any>>(environment.FAV_RECIPES_URL);
  }


  private setUserToLocalStorage(user: any) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUserFromLocalStorage(): any {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson);
    return null;
  }
}
