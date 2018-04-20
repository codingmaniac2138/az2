/**
 * Model class for module in the Amaze Portal (eg. AMAZE_TOUCH, AMAZE_USER_MANAGEMENT and etc.)
 */

import { Role } from "./role.interface";

export interface Module {
    module_id: number;
    name?: string;
    description?: string;
    roles?: Array<Role>;
}