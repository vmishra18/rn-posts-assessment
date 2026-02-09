import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { PostCard } from '../components/PostCard';
import { fetchPosts } from '../services/api';
import type { Post } from '../types/post';

// Single source of truth for screen status instead of multiple boolean states (e.g. isLoading, isError, isSuccess)
type LoadState = 'loading' | 'error' | 'success';

function PostsHeader() {
  return (
    <View style={styles.header}>
      <Text
        variant="headlineSmall"
        accessibilityRole="header"
        style={styles.headerTitle}
      >
        Latest Posts
      </Text>
    </View>
  );
}

function EmptyState() {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>No posts available.</Text>
    </View>
  );
}

function ItemSeparator() {
  return <View style={styles.separator} />;
}

export function PostsScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isLoading = loadState === 'loading';
  const isError = loadState === 'error';
  const isSuccess = loadState === 'success';

  const loadPosts = useCallback(async () => {
    setLoadState('loading');
    setErrorMessage(null);

    try {
      const result = await fetchPosts();
      setPosts(result);
      setLoadState('success');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to load posts.';
      setErrorMessage(message);
      setLoadState('error');
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  if (isLoading) {
    return (
      <SafeAreaView
        style={styles.center}
        accessibilityState={{ busy: true }}
        accessibilityLabel="Loading posts"
      >
        <ActivityIndicator accessibilityLabel="Loading" />
        <Text style={styles.statusText}>Loading posts...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.center}>
        <Text variant="titleMedium">Failed to load posts</Text>

        <Text style={styles.errorText}>
          Please try again.
          {errorMessage ? ` ${errorMessage}` : null}
        </Text>

        <Button mode="contained" onPress={loadPosts}>
          Retry
        </Button>
      </SafeAreaView>
    );
  }

  if (isSuccess) {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          testID="posts-list"
          data={posts}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <PostCard post={item} />}
          ListHeaderComponent={<PostsHeader />}
          ListEmptyComponent={<EmptyState />}
          ItemSeparatorComponent={ItemSeparator}
          contentContainerStyle={styles.listContent}
        />
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '700',
  },
  separator: {
    height: 12,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  statusText: {
    marginTop: 12,
  },
  errorText: {
    marginTop: 8,
    marginBottom: 16,
    textAlign: 'center',
  },
  empty: {
    paddingTop: 24,
    alignItems: 'center',
  },
  emptyText: {
    opacity: 0.7,
  },
});
