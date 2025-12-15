type Props = React.ComponentProps<"dialog"> & { title: string };

export function CustomPopup({ title, ...props }: Props) {
  return (
    <dialog
      {...props}
      className="backdrop:bg-gray-100 bg-gray-600 self-center justify-self-center"
    >
      <div id="dialog-top" className="pb-5 pt-5 pr-6 pl-6">
        <label className="font-bold text-base">{title}</label>
      </div>
      <div
        id="dialog-middle"
        className="pb-8 pt-8 pr-6 pl-6 border-t border-b border-gray-400"
      ></div>
      <div id="dialog-bottom" className="pb-5 pt-5 pr-6 pl-6"></div>
    </dialog>
  );
}
