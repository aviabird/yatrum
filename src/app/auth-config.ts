import { environment } from './../environments/environment';
import { CustomConfig } from 'ng2-ui-auth';

/**
 * Created by VoidZero on 09/02/2017.
 */
let apiLink:string = environment.API_ENDPOINT; // "http://localhost:3000";
export const GOOGLE_CLIENT_ID = '';
export class MyAuthConfig extends CustomConfig {
    defaultHeaders = {'Content-Type': 'application/json'};
    providers = { google: { clientId: GOOGLE_CLIENT_ID, url: `${apiLink}/auth/google` } };
}