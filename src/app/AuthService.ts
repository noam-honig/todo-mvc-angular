import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Remult } from 'remult';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private remult: Remult) {
       const token = AuthService.fromStorage();
       if (token) {
          this.setAuthToken(token);
       }
    }

    // Passes the decoded user information to Remult and stores the token in the local sessionStorage.
    setAuthToken(token: string | null) {
       if (token) {
          this.remult.setUser(new JwtHelperService().decodeToken(token));
          sessionStorage.setItem(AUTH_TOKEN_KEY, token);
       }
       else {
          this.remult.setUser(undefined!);
          sessionStorage.removeItem(AUTH_TOKEN_KEY);
       }
    }

    static fromStorage(): string {
       return sessionStorage.getItem(AUTH_TOKEN_KEY)!;
    }
}

const AUTH_TOKEN_KEY = "authToken";