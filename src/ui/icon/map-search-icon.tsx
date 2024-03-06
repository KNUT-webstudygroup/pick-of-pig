import IconContainer from '@/ui/icon/icon.container';

export default function MapSearchIcon() {
  const onClickInfo = (): void => {
    // TODO: show info modal
  };
  return (
    <IconContainer
      width={35}
      height={35}
      iconPath="/map-search.svg"
      // iconColor="var(--light-gray)"
      text="pig"
      onClick={onClickInfo}
    />
  );
}
