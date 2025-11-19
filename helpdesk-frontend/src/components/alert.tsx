import * as Icons from "./icons";

type AlertType = "success" | "failed";

export function Alert(alertText: string, type?: AlertType) {
  let typeIcon = "HelpCircleIcon";
  let typeColors = {
    textColor: "text-yellow-700",
    bgColor: "bg-yellow-200",
  };
  if (type == "success") {
    typeIcon = "CheckIcon";
    typeColors = {
      textColor: "text-green-700",
      bgColor: "bg-green-200",
    };
  } else if (type == "failed") {
    typeIcon = "XIcon";
    typeColors = {
      textColor: "text-red-700",
      bgColor: "bg-red-200",
    };
  }
  const iconItem = Icons[typeIcon];
  return (
    <output
      className={
        typeColors.textColor +
        " " +
        typeColors.bgColor +
        " " +
        "flex gap-2 bold"
      }
    >
      {iconItem({ className: "size-5 text-inherit" })}
      <p>{alertText}</p>
    </output>
  );
}
