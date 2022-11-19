import { StoreType } from './Store';

export const chatsSelector = (store: StoreType) => ({ chars: store.chats });
export const userSelector = (store: StoreType) => ({ user: store.user });
