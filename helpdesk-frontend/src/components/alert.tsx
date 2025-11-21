import * as Icons from "./icons";

type AlertType = "success" | "failed";

export function Alert(alertText: string, type?: AlertType) {
  let typeIcon = "HelpCircleIcon";
  let typeColors = {
    textColor: "text-yellow-700",
    bgColor: "bg-yellow-200",
    border: "border-yellow-700",
  };
  if (type == "success") {
    typeIcon = "CheckIcon";
    typeColors = {
      textColor: "text-green-700",
      bgColor: "bg-green-200",
      border: "border-green-700",
    };
  } else if (type == "failed") {
    typeIcon = "XIcon";
    typeColors = {
      textColor: "text-red-700",
      bgColor: "bg-red-200",
      border: "border-red-700",
    };
  }
  const iconItem = Icons[typeIcon]; // todo fix icon
  return (
    <div
      className={
        typeColors.textColor +
        " " +
        typeColors.bgColor +
        " " +
        typeColors.border +
        " " +
        "flex border pt-0.5 pb-0.5 pr-2 pl-2 gap-2 bold rounded-full items-center"
      }
    >
      {iconItem({ className: "size-5" })}
      <p>{alertText}</p>
    </div>
  );
}
