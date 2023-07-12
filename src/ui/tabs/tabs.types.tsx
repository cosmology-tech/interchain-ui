export type TabProps = {
  label: string;
  Component: () => any;
}
export interface TabsProps {
  tabs: TabProps[];
  className?: string;
}
