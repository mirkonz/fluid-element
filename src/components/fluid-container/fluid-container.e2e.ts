import { newE2EPage } from '@stencil/core/testing';

describe('fluid-container', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fluid-container></fluid-container>');

    const element = await page.find('fluid-container');
    expect(element).toHaveClass('hydrated');
  });
});
