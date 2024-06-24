import { TentTreeIcon } from 'lucide-react';
import NoResults from '@/components/dashboard/NoResults';

export default function IncomePage() {
  return (
    <NoResults title='此功能尚未開放，敬請期待' icon={TentTreeIcon} />
  );
}
