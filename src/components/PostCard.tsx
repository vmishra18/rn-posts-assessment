import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import type { Post } from '../types/post';

type Props = { post: Post };

export function PostCard({ post }: Props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(v => !v);

  return (
    <Card
      style={styles.card}
      onPress={toggleExpanded}
      accessibilityRole="button"
      accessibilityLabel={`${post.title}. ${
        expanded ? 'Collapse' : 'Expand'
      } post`}
      accessibilityHint="Double tap to expand or collapse the post content"
    >
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          {post.title}
        </Text>

        <Text
          variant="bodyMedium"
          numberOfLines={expanded ? undefined : 4}
          ellipsizeMode="tail"
          style={styles.content}
        >
          {post.content}
        </Text>

        <Text variant="labelSmall" style={styles.hint}>
          {expanded ? 'Show less' : 'Show more'}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
  },
  title: {
    marginBottom: 8,
  },
  content: {
    lineHeight: 20,
  },
  hint: {
    marginTop: 8,
    opacity: 0.7,
  },
});
