import EventBus from '../EventBus';
import { v4 as uuid } from 'uuid';
import Handlebars from 'handlebars';
import { isArray } from '../../utils/functions/isArray';
import cloneDeep from '../../utils/functions/cloneDeep';
import isEqual from '../../utils/functions/isEqual';

const enum Events {
  init = 'init',
  render = 'render',
  cdm = 'component-did-mount',
  cdu = 'component-did-update',
}

// eslint-disable-next-line @typescript-eslint/ban-types
export default class View<Props extends object = {}> {
  private readonly id: string;

  protected readonly _element: HTMLElement;
  protected props: Props;
  protected children: Props;
  protected arrayOfChildren: Props;
  protected eventBus: EventBus;

  constructor(tag = 'div', propsAndChildren: Props) {
    const { props, children, arrayOfChildren } = this.getChildren(propsAndChildren);
    const eventBus = new EventBus();

    this.id = uuid();
    this._element = this.createDocumentElement(tag);
    this.props = this.makePropsProxy({ ...props, id: this.id });
    this.children = this.makePropsProxy(children);
    this.arrayOfChildren = this.makePropsProxy(arrayOfChildren);
    this.eventBus = eventBus;

    this.registerEvents(eventBus);
    eventBus.emit(Events.init);
  }

  private getChildren(propsAndChildren: Props): { props: Props; children: Props; arrayOfChildren: Props } {
    return Object.entries(propsAndChildren).reduce(
      (acc, [key, value]) => {
        // console.log(key);
        if (value instanceof View) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          acc.children[key] = value;
        } else if (isArray(value) && value.every((i: object) => i instanceof View)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          acc.arrayOfChildren[key] = value;
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          acc.props[key] = value;
        }

        return acc;
      },
      { props: {}, children: {}, arrayOfChildren: {} } as unknown as {
        props: Props;
        children: Props;
        arrayOfChildren: Props;
      },
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

    if (Array.isArray(this.arrayOfChildren)) {
      this.arrayOfChildren.forEach((child) => {
        child.dispatchComponentDidMount();
      });
    }
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
    this.componentWillMount(oldProps, newProps);
  }

  public componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
    return isEqual(_oldProps, _newProps);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public componentWillMount(_oldProps: Props, _newProps: Props): void {}

  public setProps = (nextProps: Partial<Props>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get viewProps() {
    return this.props;
  }

  get viewArrayOfChildren() {
    return this.arrayOfChildren;
  }

  get element() {
    return this._element;
  }

  protected addEvents() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { events = {} } = this.props as Props;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  protected removeEvents() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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

  render(): DocumentFragment | string {
    return 'Empty render';
  }

  public getContent(): HTMLElement {
    return this.element;
  }

  private makePropsProxy(props: Props) {
    return new Proxy(props, {
      get: (target, prop) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        target[prop] = value;

        this.eventBus.emit(Events.cdu, cloneDeep(target), target);
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
    const propsAndStubs = { ...this.props } as Record<string, string | string[]>;

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });
    if (Object.keys(this.arrayOfChildren).length > 0) {
      Object.entries(this.arrayOfChildren).forEach(([key, children]: [string, View[]]) => {
        propsAndStubs[key] = children.map((child) => `<div data-id="${child.id}"></div>`);
      });
    }

    const fragment = this.createDocumentElement('template') as HTMLTemplateElement;

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child: View<Props>) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

      stub?.replaceWith(child.getContent());
    });
    if (Object.keys(this.arrayOfChildren).length > 0) {
      Object.values(this.arrayOfChildren).forEach((children: View[]) => {
        children.forEach((child) => {
          const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

          stub?.replaceWith(child.getContent());
        });
      });
    }

    return fragment.content;
  }
}
