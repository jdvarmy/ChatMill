import { expect } from 'chai';
import View from './index';

describe('View test suite', () => {
  function createView(props?: object) {
    return new View('div', props || {});
  }

  it('view render return a string', () => {
    expect(createView().render()).to.be.a('string');
  });

  it('view may have a prop', () => {
    expect(createView({ prop: 1 }).viewProps).to.have.property('prop');
  });
});
