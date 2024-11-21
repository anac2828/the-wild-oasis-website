import { unstable_noStore as noStore } from 'next/cache';
import { getCabins } from '@/app/_lib/data-service';
import CabinCard from '@/app/_components/CabinCard';

async function CabinLists({ filter }) {
  // will make this a dynmic component. It will be rendered on request.
  // noStore();

  const cabins = await getCabins();
  if (!cabins.length) return null;

  let displayCabins;

  if (filter === 'all') displayCabins = cabins;
  if (filter === 'small')
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === 'medium')
    displayCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  if (filter === 'large')
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  return (
    <div className='grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14'>
      {displayCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinLists;