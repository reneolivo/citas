import {RouterConfiguration, Router} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;

    config.map([
      { route: [ '', 'appointments' ], name: 'appointments', title: 'Citas', moduleId: 'appointments/index', nav: true },
      { route: 'professionals', name: 'professionals', title: 'Doctores', moduleId: 'professionals/index', nav: true },
      { route: 'clients', name: 'clients', title: 'Pacientes', moduleId: 'clients/index', nav: true }
    ]);
  }
}
