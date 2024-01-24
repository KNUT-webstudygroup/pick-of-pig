import IconContainer from '@/ui/icon/icon.container';

export default function PigIcon() {
  const onClickInfo = (): void => {
    // TODO: show info modal
  };
  return (
    <IconContainer
      width={40}
      height={40}
      iconPath="/pig.svg"
      iconColor="var(--light-gray)"
      // fontColor="var(--light-gray)"
      text="pig"
      onClick={onClickInfo}
    />
  );
}
