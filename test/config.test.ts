import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<!DOCTYPE html><div class="app"></div>', { url: 'http://localhost:3000' });

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.window = window;
global.document = window.document;
