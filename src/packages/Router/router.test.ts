import { expect } from 'chai';
import { Router } from './Router';

describe('Router test suite', () => {
  const router = new Router();

  it('history length', () => {
    router.go('/login');
    router.go('/register');

    expect(window.history.length).to.eq(3);
  });
});
