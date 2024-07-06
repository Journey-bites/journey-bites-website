'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { followCreator, unFollowCreator } from '@/lib/authApi';
import { handleApiError, debounce } from '@/lib/utils';
import { useUserStore } from '@/providers/userProvider';
import StatusCode from '@/types/StatusCode';

type UseFollowCreatorProps = {
  creatorId: string;
  successCallback?: () => void;
}

export default function useFollowCreator({ creatorId, successCallback }: UseFollowCreatorProps) {
  const { auth, setAuth } = useUserStore((state) => state);
  const [isFollowed, setIsFollowed] = useState(false);
  const { mutate: followCreatorMutate, isPending: isFollowing } = useMutation({
    mutationFn: followCreator,
    onMutate: () => setIsFollowed(true),
    onSuccess: () => {
      toast({ title: '追蹤成功', variant: 'success' });
      // Get user data again to refresh the follows
      setAuth();
      if (successCallback) {
        successCallback();
      }
    },
    onError: (error) => {
      handleApiError(error, {
        [StatusCode.DUPLICATE_FOLLOW]: () => {
          toast({ title: '已經追蹤過囉！', variant: 'warning' });
        },
        [StatusCode.ILLEGAL_PATH_PARAMETER]: () => {
          toast({ title: '不能追蹤自己哦！', variant: 'warning' });
        }
      }, '追蹤');
      setIsFollowed(false);
    }
  });
  const { mutate: unFollowCreatorMutate, isPending: isUnfollowing } = useMutation({
    mutationFn: unFollowCreator,
    onMutate: () => setIsFollowed(false),
    onSuccess: () => {
      toast({ title: '取消追蹤成功', variant: 'success' });
      // Get user data again to refresh the follows
      setAuth();
      if (successCallback) {
        successCallback();
      }
    },
    onError: (error) => {
      handleApiError(error, {
        [StatusCode.INVALID_ID]: () => {
          toast({ title: '無效的追蹤', variant: 'warning' });
        },
        [StatusCode.USER_NOT_FOUND]: () => {
          toast({ title: '查無此創作者', variant: 'error' });
        }
      }, '取消追蹤');
      setIsFollowed(true);
    }
  });

  const handleFollow = debounce(() => {
    followCreatorMutate(creatorId);
  });

  const handleUnFollow = debounce(() => {
    unFollowCreatorMutate(creatorId);
  });

  useEffect(() => {
    if (!auth) return;
    if (auth.follows.includes(creatorId)) {
      setIsFollowed(true);
    }
  }, [auth, creatorId]);

  return {
    isFollowed,
    isLoading: isFollowing || isUnfollowing,
    followAction: isFollowed ? handleUnFollow : handleFollow
  };
}
