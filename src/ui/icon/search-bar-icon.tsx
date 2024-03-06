import IconContainer from '@/ui/icon/icon.container';

interface SearchBarIconProps {
  handleSearchClick: () => void;
}

const SearchBarIcon: React.FC<SearchBarIconProps> = ({ handleSearchClick }) => (
  <IconContainer
    width={35}
    height={35}
    iconPath="/search-bar.svg"
    iconColor=""
    text="pig"
    onClick={handleSearchClick}
  />
);

export default SearchBarIcon;
