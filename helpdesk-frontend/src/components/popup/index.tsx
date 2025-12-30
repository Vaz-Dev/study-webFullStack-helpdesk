import { type ReactElement, type RefObject } from "react";
import { XIcon } from "../icons";

type Props = React.ComponentProps<"dialog"> & {
  title: string;
  children: ReactElement;
  selfRef: RefObject<HTMLDialogElement | null>;
};

export function CustomPopup({ title, selfRef, children, ...props }: Props) {
  return (
    <dialog
      {...props}
      className="backdrop:bg-gray-100 backdrop:opacity-70 bg-gray-600 self-center justify-self-center transition rounded-xl w-[440px]"
    >
      <div
        id="dialog-top"
        className="pb-5 pt-5 pr-6 pl-6 flex justify-between items-center"
      >
        <label className="font-bold text-base">{title}</label>
        <XIcon
          className="text-gray-300 size-4.5 cursor-pointer hover:text-feedback-danger transition"
          onClick={() => selfRef.current?.close()}
        ></XIcon>
      </div>
      <div id="dialog-bottom" className="p-6 border-t border-gray-500">
        {children}
      </div>
    </dialog>
  );
}
