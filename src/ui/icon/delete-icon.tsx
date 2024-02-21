import IconContainer from "@/ui/icon/icon.container";

export default function DeleteIcon() {
  const onClickInfo = (): void => {
    // TODO: show info modal
  };
  return (
    <IconContainer
      width={20}
      height={20}
      iconPath="/delete.svg"
      text="delete"
      onClick={onClickInfo}
    />
  );
}
