import { Base } from './base';

export interface Picture extends Base {
    link: string; // any remote link like cloudinay link
    description: string;
}