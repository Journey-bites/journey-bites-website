'use client';

import { User2Icon, Loader2Icon } from 'lucide-react';
import TitleWIthIcon from '@/components/dashboard/TitleWIthIcon';
import TabsWithContent from '@/components/dashboard/TabsWithContent';
import ProfileForm from './ProfileForm';
import LinksForm from './LinksForm';
import { useUserStore } from '@/providers/userProvider';

export default function EditInfo() {
  const { auth } = useUserStore((state) => state);

  return (
    <>
      <TitleWIthIcon title='個人資料管理' icon={User2Icon} />
      {!auth ? <Loader2Icon className='mx-auto size-6 animate-spin text-primary' /> : (
        <TabsWithContent
          defaultValue='profile'
          tabs={[
            {
              value: 'profile',
              label: '個人資料',
              content: <ProfileForm displayName={auth.profile.displayName || ''} email={auth.email || ''} bio={auth.profile.bio || ''}/>
            },
            {
              value: 'links',
              label: '連結設定',
              content: <LinksForm socialLinks={auth.profile.socialLinks} />
            }]
          }
        />
      )}
    </>
  );
}
