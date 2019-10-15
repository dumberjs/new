import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('Component app', () => {
  let component;
  let model = {};

  beforeEach(() => {
    component = StageComponent
      .withResources('app')
      .inView('<app></app>')
      .boundTo(model);
  });

  afterEach(() => {
    if (component) {
      component.dispose();
      component = null;
    }
  });

  it('should render message', async () => {
    await component.create(bootstrap);
    const view = component.element;
    expect(view.textContent.trim()).toBe('Hello Aurelia!');
  });
});
