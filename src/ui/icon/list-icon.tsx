import IconContainer from "@/ui/icon/icon.container";

export default function ListIcon() {
  const onClickInfo = (): void => {
    // TODO: show info modal
  };
  return (
    <IconContainer
      width={60}
      height={60}
      iconPath="/list.svg"
      // iconColor="var(--light-gray)"
      text="delete"
      onClick={onClickInfo}
    />
  );
}
