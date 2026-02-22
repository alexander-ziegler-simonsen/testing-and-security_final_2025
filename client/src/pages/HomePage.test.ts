import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import HomePage from './HomePage.vue';

test('increments counter on click', async () => {
    const { getByText } = render(HomePage);

    const button = getByText(/counter/i);

    await fireEvent.click(button);

    getByText('Counter: 1');
});
