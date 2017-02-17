import { Secrets } from './secret';
import { environment } from './../environments/environment';
import { CustomConfig } from 'ng2-ui-auth';

/**
 * Created by VoidZero on 16/02/2017.
 */

let apiLink:string = environment.API_ENDPOINT; // "http://localhost:3000";
export const GOOGLE_CLIENT_ID = Secrets.google_client_id;
export const FACEBOOK_CLIENT_ID = Secrets.facebook_client_id;
export class MyAuthConfig extends CustomConfig {
    defaultHeaders = {'Content-Type': 'application/json'};
    providers = { google: { clientId: GOOGLE_CLIENT_ID, url: `${apiLink}/auth/google` }, 
                  facebook: { clientId: FACEBOOK_CLIENT_ID, url: `${apiLink}/auth/facebook` } };
}