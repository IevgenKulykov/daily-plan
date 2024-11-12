import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../../App';


test('renders "Your rewards", "Coffee - 10 points", "Movie Ticket - 100 points" texts', () => {
  render(<App />);
  
  const rewardsText = screen.getByText(/Your rewards/i);
  expect(rewardsText).toBeInTheDocument();
  
  const coffeeText = screen.getByText(/Coffee - 10 points/i);
  expect(coffeeText).toBeInTheDocument();
  
  const movieText = screen.getByText(/Movie Ticket - 100 points/i);
  expect(movieText).toBeInTheDocument();
});

test('renders enabled "Add Reward" button', () => {
  render(<App />);
    const addRewardButton = screen.getByRole('button', { name: /Add Reward/i });
  expect(addRewardButton).toBeEnabled();
});

test('renders all disabled "Redeem" buttons', () => {
  render(<App />);
  const redeemButtons = screen.getAllByRole('button', { name: /Redeem/i });
  redeemButtons.forEach((button) => {
    expect(button).toBeDisabled();
  });
});

test('renders "New reward" textfield is empty by default', () => {
  render(<App />);
  const newRewardInput = screen.getByPlaceholderText(/New reward/i);
  expect(newRewardInput).toHaveValue('');
});

test('renders "Points Required" field has 1 value by default', () => {
  render(<App />);
  const pointsRequiredInput = screen.getByTestId('reward-points-select');
    expect(pointsRequiredInput).toHaveValue('1');
});

test('renders "Daily plan", "Total Points" text, "Add Task" button', () => {
  render(<App />);
  const dotElement = screen.getByTestId('dot-1');
  fireEvent.click(dotElement);

  const dailyPlanText = screen.getByText(/Daily plan/i);
  expect(dailyPlanText).toBeInTheDocument();
  const totalPointsText = screen.getByText(/Total Points/i);
  expect(totalPointsText).toBeInTheDocument();

  render(<App />);
    const addTaskButton = screen.getByRole('button', { name: /Add Task/i });
  expect(addTaskButton).toBeEnabled();
});

test('adds a new reward when the "Add reward" button is clicked', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/New reward/i);
  fireEvent.change(inputElement, { target: { value: 'Tea' } });

  const addButton = screen.getByRole('button', { name: /Add Reward/i });
  fireEvent.click(addButton);

  const newReward = screen.getByText('Tea - 1 points');
  expect(newReward).toBeVisible();
});

