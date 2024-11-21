// This layout will apply to all the pages nested in the account route. "children" is the content of the page of the route.

import SideNavigation from '@/app/_components/SideNavigation';

export default function Layout({ children }) {
  return (
    <div className='grid grid-cols-[16rem_1fr] h-full gap-12'>
      <SideNavigation />
      <div className='py-1'>{children}</div>
    </div>
  );
}
