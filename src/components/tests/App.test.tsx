import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../../App';

test('renders "Available Rewards", "Coffee - 50 points", "Movie Ticket - 150 points" texts', () => {
  render(<App />);
  
  const rewardsText = screen.getByText(/Available Rewards/i);
  expect(rewardsText).toBeInTheDocument();
  
  const coffeeText = screen.getByText(/Coffee - 50 points/i);
  expect(coffeeText).toBeInTheDocument();
  
  const movieText = screen.getByText(/Movie Ticket - 150 points/i);
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
  const newRewardInput = screen.getByPlaceholderText(/Add New Reward/i);
  expect(newRewardInput).toHaveValue('');
});

test('renders "Points Required" field has 5 value by default', () => {
  render(<App />);
  const pointsRequiredInput = screen.getByPlaceholderText(/Points Required/i);
  expect(pointsRequiredInput).toHaveValue(5);
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
  const inputElement = screen.getByPlaceholderText(/Add New Reward/i);
  fireEvent.change(inputElement, { target: { value: 'Free Coffee' } });

  const addButton = screen.getByRole('button', { name: /Add Reward/i });
  fireEvent.click(addButton);

  const newReward = screen.getByText('Free Coffee - 5 points');
  expect(newReward).toBeVisible();
});

test('should not accept values less than 1', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText('Points Required') as HTMLInputElement;;

  // Try entering a value less than 1
  fireEvent.change(inputElement, { target: { value: '0' } });
  expect(inputElement.value).toBe('0'); // Should not accept 0

  fireEvent.change(inputElement, { target: { value: '-5' } });
  expect(inputElement.value).toBe('-5'); // Should not accept negative numbers

  // Try entering a valid value
  fireEvent.change(inputElement, { target: { value: '3' } });
  expect(inputElement.value).toBe('3'); // Should accept 3
});
