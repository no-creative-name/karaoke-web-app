import { render, screen, waitFor } from "@testing-library/react";
import { Countdown } from ".";

describe('Countdown', () => {
  test('renders countFrom number initially', () => {
    render(<Countdown
      countFrom={5}
      onCountdownDone={() => { }}
    ></Countdown>);
    screen.getByText(5);
  });
  test('renders countFrom - x after x seconds', async () => {
    render(<Countdown
      countFrom={5}
      onCountdownDone={() => { }}
    ></Countdown>);
    await waitFor(() => {
      screen.getByText(4);
    });
    await waitFor(() => {
      screen.getByText(3);
    });
  });
  test('calls onCountdownDone when countdown over', async () => {
    const doneMock = jest.fn();
    render(<Countdown
      countFrom={1}
      onCountdownDone={doneMock}
    ></Countdown>);
    await waitFor(() => {
      expect(doneMock).toHaveBeenCalled();
    }, {
      timeout: 2000,
    });
  });
});