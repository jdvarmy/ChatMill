import EventBus from '../EventBus';
import { v4 as uuid } from 'uuid';
import Handlebars from 'handlebars';

const enum Events {
  init = 'init',
  render = 'render',
  cdm = 'component-did-mount',
  cdu = 'component-did-update',
}

type Props = any;
type Children = Record<string, Block>;

export default abstract class Block {
  _id: string;
  _element: HTMLElement;
  _meta: { tag: string; props: Props };
  props: Props;
  children: Children = {};
  eventBus: EventBus;

  constructor(tag = 'div', propsAndChildren = {}) {
    const props = this._getChildren(propsAndChildren);
    const eventBus = new EventBus();

    this._id = uuid();
    this._element = this._createDocumentElement(tag);
    this._meta = { tag, props };
    this.props = this._makePropsProxy({ ...props, _id: this._id });
    this.children = this._makePropsProxy({ ...this.children });
    this.eventBus = eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Events.init);
  }

  _getChildren(propsAndChildren: Props) {
    return Object.entries(propsAndChildren).reduce((props, [key, value]) => {
      if (value instanceof Block) {
        this.children[key] = value;
      } else {
        props[key] = value;
      }

      return props;
    }, {} as Props);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.subscribe(Events.init, this.init.bind(this));
    eventBus.subscribe(Events.cdm, this._componentDidMount.bind(this));
    eventBus.subscribe(Events.cdu, this._componentDidUpdate.bind(this));
    eventBus.subscribe(Events.render, this._render.bind(this));
  }

  init() {
    this.eventBus.emit(Events.render);
  }

  _componentDidMount(): void {
    this.componentDidMount(this.props);

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount(oldProps: Props): void {
    return oldProps;
  }

  dispatchComponentDidMount() {
    this.eventBus.emit(Events.cdm);
  }

  _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    // todo: сделать метод
    return true;
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  addAttribute(attr: object): void {
    Object.entries(attr).forEach(([key, value]) => {
      this._element.setAttribute(key, value);
    });
  }

  _render() {
    const block = this.render();

    this._removeEvents();

    this._element.innerHTML = '';
    if (typeof block === 'object') {
      this._element.append(block);
    } else {
      this._element.innerHTML = block;
    }

    this._addEvents();
  }

  abstract render(): DocumentFragment | string;

  getContent(): HTMLElement {
    return this.element;
  }

  _makePropsProxy(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        target[prop] = value;

        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus.emit(Events.cdu, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tag: string) {
    const element = document.createElement(tag);
    if (tag === 'template') {
      element.setAttribute('data-id', this._id);
    }
    return element;
  }

  compile(template: string) {
    const propsAndStubs: Record<string, Block | string> = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child: Block) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      stub?.replaceWith(child.getContent());
    });

    return fragment.content;
  }
}
