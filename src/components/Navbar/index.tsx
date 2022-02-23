import { NavbarItem, NavbarItemProps } from './NavbarItem';
import logo from './logo.png';
import logo2 from './logo2.png';
import { Bookmark, ExternalLink, ArrowRight } from 'react-feather';
import ExtensionCard from '../Common/extensionCard';
import Footer from '../Footer';

interface NavbarProps {
  primaryItems: NavbarItemProps[];
  secondaryItems: NavbarItemProps[];
  className?: string;
  isDisabled?: boolean;
}

const Navbar = ({
  primaryItems,
  secondaryItems,
  className,
  isDisabled,
}: NavbarProps) => (
  <nav className='transition-all border-r border-grey-m w-side h-full   m2xl:hidden mmd:hidden'>
    <ul>
      <li>
        <div className='flex w-20  p-6 mb-2 justify-center xxl:hidden'>
          <img alt='logo2' src={logo2} width={32} height={32} />
        </div>
        <div className=' flex p-6 items-center  justify-between m2xl:hidden'>
          <img alt='logo' src={logo} />
          <Bookmark color='#70768C' />
        </div>
      </li>
      <div className='border mx-4 flex m2xl:hidden'></div>
      <li className='px-4 pt-6 text-gray-400 font-medium text-sm m2xl:hidden'>
        REPORTS
      </li>
      {primaryItems?.map((itemProps) => (
        <li key={itemProps.text}>
          <NavbarItem {...itemProps} />
        </li>
      ))}
    </ul>
    <div className='pt-6 m2xl:hidden'>
      <div className='border mx-4 flex '></div>
    </div>
    <ul>
      <li className='px-4 pt-6 text-gray-400 font-medium text-sm m2xl:hidden'>
        OPTION
      </li>
      {secondaryItems.map((itemProps) => (
        <li key={itemProps.text}>
          <NavbarItem {...itemProps} />
        </li>
      ))}
    </ul>
    <section className='bottom-10 absolute w-side m2xl:hidden'>
      <div className='flex items-center px-4 w-full'>
        <ExtensionCard
          icon={<ExternalLink size='20' />}
          text='Download the extension from Chrome Web Store.'
          to={{ pathname: 'Try now', icon: <ArrowRight size='20' /> }}
        />
      </div>
      <div className='px-4 pt-4'>
        <Footer />
      </div>
    </section>
  </nav>
);

export default Navbar;
