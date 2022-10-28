import EventBus from '../EventBus';
import { v4 as uuid } from 'uuid';
import Handlebars from 'handlebars';

const enum Events {
  init = 'init',
  render = 'render',
  cdm = 'component-did-mount',
  cdu = 'component-did-update',
}

// eslint-disable-next-line @typescript-eslint/ban-types
export default abstract class View<Props extends object = {}> {
  private readonly id: string;

  protected readonly _element: HTMLElement;
  protected props: Props;
  protected children: Props;
  protected eventBus: EventBus;

  protected constructor(tag = 'div', propsAndChildren: Props) {
    const { props, children } = this.getChildren(propsAndChildren);
    const eventBus = new EventBus();

    this.id = uuid();
    this._element = this.createDocumentElement(tag);
    this.props = this.makePropsProxy({ ...props, id: this.id });
    this.children = this.makePropsProxy(children);
    this.eventBus = eventBus;

    this.registerEvents(eventBus);
    eventBus.emit(Events.init);
  }

  private getChildren(propsAndChildren: Props): { props: Props; children: Props } {
    return Object.entries(propsAndChildren).reduce(
      (acc, [key, value]) => {
        if (value instanceof View) {
          acc.children[key] = value;
        } else {
          acc.props[key] = value;
        }

        return acc;
      },
      { props: {}, children: {} } as { props: Props; children: Props },
    );
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.subscribe(Events.init, this.init.bind(this));
    eventBus.subscribe(Events.cdm, this._componentDidMount.bind(this));
    eventBus.subscribe(Events.cdu, this._componentDidUpdate.bind(this));
    eventBus.subscribe(Events.render, this._render.bind(this));
  }

  private init(): void {
    this.eventBus.emit(Events.render);
  }

  private _componentDidMount(): void {
    this.componentDidMount(this.props);

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  public componentDidMount(oldProps: Props): Props {
    return oldProps;
  }

  public dispatchComponentDidMount() {
    this.eventBus.emit(Events.cdm);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  public componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
    // todo: сделать метод
    return true;
  }

  public setProps = (nextProps: Partial<Props>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  protected addEvents() {
    const { events = {} } = this.props as Props;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  protected removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  public addAttribute(attr: object): void {
    Object.entries(attr).forEach(([key, value]) => {
      this.element.setAttribute(key, value);
    });
  }

  private _render() {
    const block = this.render();

    this.removeEvents();

    this._element.innerHTML = '';
    if (typeof block === 'object') {
      this._element.append(block);
    } else {
      this._element.innerHTML = block;
    }

    this.addEvents();
  }

  abstract render(): DocumentFragment | string;

  public getContent(): HTMLElement {
    return this.element;
  }

  private makePropsProxy(props: Props) {
    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        target[prop] = value;

        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        this.eventBus.emit(Events.cdu, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  protected createDocumentElement(tag: string) {
    const element = document.createElement(tag);
    if (tag === 'template') {
      element.setAttribute('data-id', this.id);
    }
    return element;
  }

  compile(template: string) {
    const propsAndStubs = { ...this.props } as Record<string, View<Props> | string>;

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const fragment = this.createDocumentElement('template') as HTMLTemplateElement;

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child: View<Props>) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

      stub?.replaceWith(child.getContent());
    });

    return fragment.content;
  }
}
