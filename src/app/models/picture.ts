import { Base } from './base';

export interface Picture extends Base {
    id: string;
    url: string; // any remote link like cloudinay link
    description: string;
    public_id: string;
    // review: string;
}