import { StoreType } from './Store';

export const chartsSelector = (store: StoreType) => ({ charts: store.chats });
export const userSelector = (store: StoreType) => ({ user: store.user });
