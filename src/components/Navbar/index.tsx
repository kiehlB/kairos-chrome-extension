import { NavbarItem, NavbarItemProps } from './NavbarItem';
import logo from './logo.png';

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
  <nav>
    <ul>
      <li>
        <div>
          <img alt='logo' src={logo} />
        </div>
      </li>
      {primaryItems?.map((itemProps) => (
        <li key={itemProps.text}>
          <NavbarItem {...itemProps} />
        </li>
      ))}
    </ul>
    <ul></ul>
  </nav>
);

export default Navbar;
