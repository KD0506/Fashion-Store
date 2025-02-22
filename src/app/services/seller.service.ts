import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn= new BehaviorSubject<boolean>(false)
  isLoginError= new EventEmitter<boolean>(false)

  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(data:SignUp) {
    this.http.post('https://database-k6wy.onrender.com/seller', data, {observe:'response'}).subscribe((result)=>{
      // this.isSellerLoggedIn.next(true);
      console.warn(result)
      if(result){ 
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home']);
      }
    })
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  userLogin(data:login){
    console.warn(data)
    this.http.get(`https://database-k6wy.onrender.com/seller?email=${data.email}&password=${data.password}`, {observe:'response'}).subscribe((result:any)=>{
      console.warn(result)
      if(result && result.body && result.body.length){
        console.warn("user logged in")
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home']);
      }
      else {
        console.warn("login failed");
        this.isLoginError.emit(true)
      }
    })
  }
}
