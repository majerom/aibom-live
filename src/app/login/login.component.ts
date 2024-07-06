import { Component } from '@angular/core';
import { AiBomService } from '../service/ai-bom.service';
import { LoggedInPermissionUsingBoolean } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginValid = true;
  public username = '';
  public password = '';
  isInvalidLogin: boolean = false;

  constructor(
    public loginService: LoggedInPermissionUsingBoolean,
    public router: Router

  ) { }


  public onSubmit(): void {


    this.loginService.getLogin(this.username).subscribe((data: any) =>{
      console.log(data, this.password);

      if(data.length > 0 && data[0].password === this.password){
        localStorage.setItem('loginData', JSON.stringify(data[0]));
        this.router.navigateByUrl('/dashboard');
      }else{
        this.isInvalidLogin = true
      }

      
    })
  }
}
