import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import Header from '../../components/Base/Header';
import SingleCard from '../home/singleCard';
import ThridCard from '../home/thirdCard';

function History() {
  return (
    <div className='w-full dark:bg-gray-900 bg-white-m  '>
      <AppLayout.MainNav>
        <Header />
      </AppLayout.MainNav>
      <AppLayout
        first={<AppLayout.First>{<SingleCard />}</AppLayout.First>}
        second={<AppLayout.Second>{<SingleCard />}</AppLayout.Second>}
        third={<AppLayout.Third>{<ThridCard />}</AppLayout.Third>}
      />
      <AppLayout />
    </div>
  );
}

export default History;
