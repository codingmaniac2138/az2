// Interface for the search Query
import { Module } from "./module.interface";
export interface searchQuery {
    username?: string;
    first_name?: string;
    last_name?: string;
    search_active_directory?: boolean;
    module?: any
}