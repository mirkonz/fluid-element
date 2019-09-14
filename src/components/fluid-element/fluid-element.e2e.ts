import { newE2EPage } from '@stencil/core/testing';

describe('fluid-element', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fluid-element></fluid-element>');

    const element = await page.find('fluid-element');
    expect(element).toHaveClass('hydrated');
  });
});
