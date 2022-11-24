type Props = { rootQuery?: string };

export class Route {
  private pathname: string;
  private readonly viewFunction: (query?: string) => Element | undefined;
  private element: Element | null | undefined;
  private props: Props;

  constructor(pathname: string, view: (query?: string) => Element | undefined, props: Props) {
    this.pathname = pathname;
    this.viewFunction = view;
    this.element = null;
    this.props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    // todo: при уходе нужно отписаться от всего где подписались
    if (this.element) {
      this.element.textContent = '';
    }
  }

  match(pathname: string) {
    return pathname === this.pathname;
  }

  render() {
    this.element = this.viewFunction(this.props.rootQuery);
  }
}
