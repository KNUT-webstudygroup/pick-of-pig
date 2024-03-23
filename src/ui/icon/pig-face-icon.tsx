import IconContainer from "@/ui/icon/icon.container";

export default function PigFaceIcon() {
  const onClickInfo = (): void => {
    // TODO: show info modal
  };
  return (
    <IconContainer
      width={150}
      height={70}
      iconPath="/header-pig.svg"
      // iconColor="var(--light-gray)"
      text="delete"
      onClick={onClickInfo}
    />
  );
}
