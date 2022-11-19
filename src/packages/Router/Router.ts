import { Route } from './Route';
import { getUserRequest } from '../../api/requests/getUserRequest';
import store from '../Store/Store';
import { camelCaseKeys } from '../../utils/functions/camelCaseKeys';

export class Router {
  public routes: Route[] | undefined;
  public history: History | undefined;
  private currentRoute: Route | null | undefined;
  private readonly rootQuery: string | undefined;

  public static instance: Router;

  constructor(rootQuery?: string) {
    if (Router.instance) {
      return Router.instance;
    }

    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;
    this.rootQuery = rootQuery;

    Router.instance = this;
  }

  private pushRoute(pathname: string, fnc: (query?: string) => Element | undefined) {
    if (!this.routes) {
      this.routes = [] as Route[];
    }

    const route = new Route(pathname, fnc, { rootQuery: this.rootQuery });
    this.routes.push(route);
  }

  public use(pathname: string | string[], viewFnc: (query?: string) => Element | undefined): Router {
    if (Array.isArray(pathname)) {
      pathname.forEach((path) => this.pushRoute(path, viewFnc));
    } else {
      this.pushRoute(pathname, viewFnc);
    }

    return this;
  }

  public start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      this.onRoute((event.currentTarget as Window)?.location.pathname);
    };

    this.onRoute(window.location.pathname);

    getUserRequest()
      .then((respose) => {
        if (respose) {
          store.set('user', camelCaseKeys(respose));
          if (['/', '/registration'].includes(window.location.pathname)) {
            this.go('/messenger');
          }
        }
      })
      .catch((reject) => {
        store.set('user', null);
        console.log(reject);
        this.go('/');
      });
  }

  public onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route || this.currentRoute === route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  go(pathname: string): void {
    this.history?.pushState({}, '', pathname);
    this.onRoute(pathname);
  }

  back(): void {
    this.history?.back();
  }

  forward(): void {
    this.history?.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes?.find((route) => route.match(pathname)) ?? this.routes?.find((route) => route.match('*'));
  }
}
