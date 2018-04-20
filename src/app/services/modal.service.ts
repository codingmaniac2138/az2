import { Injectable } from "@angular/core";

import { CONFIG } from "../../config";

// service to add the user in the active_directory to the AMAZE Database
@Injectable()
export class ModalService {

    private addURL = `${CONFIG.url_prefix}/amaze/api/v1.0/user_management/add_user`;
    
    constructor() {}

    
}