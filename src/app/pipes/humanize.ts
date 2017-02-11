import { Pipe } from '@angular/core';
var humanize: any = require('humanize-num');

@Pipe({ name: 'humanize' })
export class HumanizePipe {

  transform(value) {
    return humanize(value);
  }

}