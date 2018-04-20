/**
 * Config file that will provide the devlopment and production feature too
 */
import { environment } from "../environments/environment";
import { DEV_CONFIG } from "./dev.config"
import { PROD_CONFIG } from "./prod.config";
import { TEST_CONFIG } from "./test.config";
import { STAGING_CONFIG } from "./stage.config";

export let CONFIG: any;

if(environment.production) {
    console.log("Inside the config file and in production mode");
    CONFIG = PROD_CONFIG;
}
else if(environment.development){
    console.log("Inside the config file and in development mode");
    CONFIG = DEV_CONFIG;
}
else if(environment.testing) {
    console.log("Inside the config file and in testing mode");
    CONFIG = TEST_CONFIG;
} 
else if(environment.staging) {
    console.log("Inside the config file and in staging mode");
    CONFIG = STAGING_CONFIG
}
