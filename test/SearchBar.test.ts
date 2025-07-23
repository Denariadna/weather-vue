import { render, fireEvent } from '@testing-library/vue';
import SearchBar from '@/components/SearchBar.vue';
import { describe, expect, it } from 'vitest';

describe('SearchBar', () => {
  it('emits "search" event with input value on submit', async () => {
    const { getByPlaceholderText, getByRole, emitted } = render(SearchBar);

    const input = getByPlaceholderText('Enter city name') as HTMLInputElement;
    await fireEvent.update(input, 'Paris');

    const button = getByRole('button', { name: /search/i });
    await fireEvent.click(button);

    expect(emitted()).toHaveProperty('search');
    expect(emitted().search[0]).toEqual(['Paris']);
  });

  it('does not emit if input is empty or only spaces', async () => {
    const { getByPlaceholderText, getByRole, emitted } = render(SearchBar);

    const input = getByPlaceholderText('Enter city name') as HTMLInputElement;
    await fireEvent.update(input, '   ');

    const button = getByRole('button', { name: /search/i });
    await fireEvent.click(button);

    expect(emitted().search).toBeUndefined();
  });
});
