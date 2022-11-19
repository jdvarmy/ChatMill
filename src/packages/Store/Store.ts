import set from '../../utils/functions/set';
import EventBus from '../EventBus';

export enum StoreEvents {
  updated = 'updated',
}
export type UserStoreDataType = {
  id: number;
  login: string;
  email: string;
  phone: string;
  firstName: string;
  secondName: string;
  displayName: string | null;
  avatar: string | null;
  status?: string | null;
};
export type ChatStoreType = {
  id: number;
  createdBy: number;
  title: string;
  avatar: string | null;
  unreadCount: number;
  lastMessage: {
    user: Omit<UserStoreDataType, 'id' | 'status' | 'displayName'>;
    time: Date;
    content: string;
  } | null;
};

export type StoreType = {
  user: UserStoreDataType;
  chats: ChatStoreType[] | null;
  activeChatId: number | null;
  token: string | null;
};

const initialStore = {
  user: {} as UserStoreDataType,
  chats: null,
  activeChatId: null,
  token: null,
};

class Store extends EventBus {
  public state: StoreType = initialStore;

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    if (this.listeners[StoreEvents.updated]) {
      this.emit(StoreEvents.updated);
    }
  }
}

export default new Store();
