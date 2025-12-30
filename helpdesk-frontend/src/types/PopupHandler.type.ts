import type { ReactElement } from "react";

export type PopupHandler = {
  set: React.Dispatch<
    React.SetStateAction<{
      title: string | null;
      body: ReactElement | null;
    }>
  >;
  ref: React.RefObject<HTMLDialogElement | null>;
};
