import IconContainer from '@/ui/icon/icon.container';

export default function PigFaceIcon() {
  const onClickInfo = (): void => {
    // TODO: show info modal
  };
  return (
    <IconContainer
      width={310}
      height={110}
      iconPath="/pig-face.svg"
      // iconColor="var(--light-gray)"
      text="delete"
      onClick={onClickInfo}
    />
  );
}
