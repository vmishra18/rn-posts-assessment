import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { PostsScreen } from '../src/screens/PostsScreen';
import { fetchPosts } from '../src/services/api';

jest.mock('../src/services/api', () => ({
  fetchPosts: jest.fn(),
}));

describe('PostsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders posts after successful load', async () => {
    (fetchPosts as jest.Mock).mockResolvedValueOnce([
      { id: 1, title: 'Hello', content: 'World' },
      { id: 2, title: 'Another', content: 'Post' },
    ]);

    const { getByText, findByText, queryByText } = render(<PostsScreen />);

    expect(getByText(/loading posts/i)).toBeOnTheScreen();
    expect(fetchPosts).toHaveBeenCalledTimes(1);

    expect(await findByText('Hello')).toBeOnTheScreen();
    expect(await findByText('World')).toBeOnTheScreen();
    expect(await findByText('Another')).toBeOnTheScreen();
    expect(await findByText('Post')).toBeOnTheScreen();

    expect(queryByText(/loading posts/i)).toBeNull();
  });

  it('shows error state and allows retry', async () => {
    (fetchPosts as jest.Mock)
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce([]);

    const { getByText, findByText } = render(<PostsScreen />);

    expect(getByText(/loading posts/i)).toBeOnTheScreen();
    expect(fetchPosts).toHaveBeenCalledTimes(1);

    expect(await findByText('Failed to load posts')).toBeOnTheScreen();
    expect(await findByText(/network error/i)).toBeOnTheScreen();

    fireEvent.press(getByText('Retry'));
    expect(fetchPosts).toHaveBeenCalledTimes(2);

    expect(await findByText('No posts available.')).toBeOnTheScreen();
  });
});
