import IconContainer from "@/ui/icon/icon.container";

export default function DeleteIcon() {
  const onClickInfo = (): void => {
    // TODO: show info modal
  };
  return (
    <IconContainer
      width={30}
      height={30}
      iconPath="/delete.svg"
      // iconColor="var(--light-gray)"
      text="delete"
      onClick={onClickInfo}
    />
  );
}
