import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable, of } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';

import { Store } from '@app/store';
import { AuthService } from '@app/auth/shared/services/auth.service';



export interface Service {
  name: string;
  ingredients: string[];
  alergics: string[];
  timestamp: number;
  key: string;
  $exists: () => boolean;
}


@Injectable()
export class ServicesService {

  services$: Observable<any> = this.db
    .list(`services/${this.uid}`)
    .snapshotChanges()
    .pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))),
      tap(next => this.store.set('services', next))
    );

  constructor(private store: Store,
              private db: AngularFireDatabase,
              private authService: AuthService) {}

  get uid() {
    return this.authService.user.uid;
  }

  getService(key: string) {
    if (!key) return of({});

    return this.store.select<Service[]>('services')
      .pipe(
        filter(Boolean),
        map(services => services.find((service: Service) => service.key === key))
      );
  }

  addService(service: Service) {
    return this.db.list(`services/${this.uid}`).push(service);
  }

  updateService(key: string, service: Service) {
    return this.db.object(`services/${this.uid}/${key}`).update(service);
  }

  removeService(key: string) {
    return this.db.list(`services/${this.uid}`).remove(key);
  }

}
