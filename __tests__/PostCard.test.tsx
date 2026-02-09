import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { PostCard } from '../src/components/PostCard';

describe('PostCard', () => {
  it('toggles expanded state when pressed', () => {
    const post = {
      id: 1,
      title: 'Hello',
      content: 'Long content that should expand and collapse.',
    };

    const { getByLabelText, getByText, queryByLabelText } = render(
      <PostCard post={post} />,
    );

    expect(getByText('Show more')).toBeOnTheScreen();
    expect(getByLabelText('Hello. Expand post')).toBeOnTheScreen();

    fireEvent.press(getByLabelText('Hello. Expand post'));

    expect(getByText('Show less')).toBeOnTheScreen();
    expect(getByLabelText('Hello. Collapse post')).toBeOnTheScreen();
    expect(queryByLabelText('Hello. Expand post')).toBeNull();

    fireEvent.press(getByLabelText('Hello. Collapse post'));

    expect(getByText('Show more')).toBeOnTheScreen();
  });
});
