import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

//

import { UserEffects } from './user.effects';
import { UserAuthEffects } from './user-auth.effect';
import { TripsEffects } from './trips.effects';
import { InstagramEffects } from './instagram.effects';
import { CommentEffects } from './comments.effects';

@NgModule({
  imports: [
    EffectsModule.run(UserEffects),
    EffectsModule.run(UserAuthEffects),
    EffectsModule.run(TripsEffects),
    EffectsModule.run(InstagramEffects),
    EffectsModule.run(CommentEffects),
  ]
})
export class AppEffectsModule {}