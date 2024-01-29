import IconContainer from "@/ui/icon/icon.container";

export default function SearchBarIcon() {
  const onClickInfo = (): void => {
    // TODO: show info modal
  };
  return (
    <IconContainer
      width={35}
      height={35}
      iconPath="/search-bar.svg"
      iconColor=""
      text="pig"
      onClick={onClickInfo}
    />
  );
}
