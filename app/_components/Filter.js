'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname(); //pathname is /cabin

  const activeFilter = searchParams.get('capacity') ?? 'all';

  const handleFilter = (filter) => {
    const params = new URLSearchParams(searchParams);
    params.set('capacity', filter);

    //params.toString() will create a string from the filter: capacity=small. router.replace will create the navigation so the data will load. {scroll: false will keep the browser window from scrolling to the top }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className='flex border border-primary-800'>
      <Button filter='all' handleFilter={handleFilter}>
        All cabins
      </Button>
      <Button filter='small' handleFilter={handleFilter}>
        1&mdash;3 guests
      </Button>
      <Button filter='medium' handleFilter={handleFilter}>
        4&mdash;7 guests
      </Button>
      <Button filter='large' handleFilter={handleFilter}>
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, activeFilter, handleFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeFilter === filter ? 'bg-primary-700 text-primary-50' : ''
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
