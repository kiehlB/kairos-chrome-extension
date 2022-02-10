import { NavbarItem, NavbarItemProps } from './NavbarItem';
import logo from './logo.png';
import { Bookmark } from 'react-feather';
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
  <nav className='border-r border-grey-m w-side h-full '>
    <ul>
      <li>
        <div className=' flex p-6 items-center  justify-between'>
          <img alt='logo' src={logo} />
          <Bookmark color='#70768C' />
        </div>
      </li>
      <div className='border mx-4 flex'></div>
      <li className='px-4 pt-6 text-gray-400 font-medium text-sm'>REPORTS</li>
      {primaryItems?.map((itemProps) => (
        <li key={itemProps.text}>
          <NavbarItem {...itemProps} />
        </li>
      ))}
    </ul>
    <div className='pt-6'>
      <div className='border mx-4 flex'></div>
    </div>
    <ul>
      <li className='px-4 pt-6 text-gray-400 font-medium text-sm'>OPTION</li>
      {secondaryItems.map((itemProps) => (
        <li key={itemProps.text}>
          <NavbarItem {...itemProps} />
        </li>
      ))}
    </ul>
    <ul></ul>
  </nav>
);

export default Navbar;
