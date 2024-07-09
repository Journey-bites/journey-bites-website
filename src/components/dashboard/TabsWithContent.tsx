import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Tab } from '@/types';

type TabsWithContentProps = {
  defaultValue: string;
  tabs: Tab[];
  onValueChange?: (value: string) => void
};

export default function TabsWithContent({ defaultValue, tabs, onValueChange }: TabsWithContentProps) {
  return (
    <Tabs className='overflow-x-auto' defaultValue={defaultValue} onValueChange={onValueChange}>
      <TabsList className='mb-10 gap-4 overflow-hidden rounded-lg bg-grey p-0 text-grey-300 shadow-tabs xs:mb-6'>
        {tabs.map((tab) => (
          <TabsTrigger className='px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-white' key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
        ))}
      </TabsList>
      {
        tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))
      }
    </Tabs>
  );
}
