import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";

/**
 *  Authorization Interceptor that will handle the adding of the Authorization Header.
 */

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    // intercept method that will add tokens in the header
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        console.log("Inside intercept method");

        const access_token = localStorage.getItem("access_token");
        // console.log("the value of the access_token is:"+ access_token);

        if(access_token) {
            
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    `Bearer ${access_token}`)
            });
    
            return next.handle(cloned);
        }
        else {
            
            return next.handle(req);
        }
    }
}