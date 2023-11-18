import * as React from "react";
import { confirmable, ConfirmDialogProps } from "react-confirm";

export interface Props {
  okLabel?: string;
  cancelLabel?: string;
  title?: string;
  confirmation?: string;
}

const Confirmation: React.FC<ConfirmDialogProps<Props, boolean>> = (props) => (
  <>
    <div
      id="modal"
      className="z-20 center flex flex-col w-full bg-white p-2 rounded-lg md:w-1/5"
    >
      <p className="my-2 text-xl text-black text-center font-semibold">
        {props.confirmation}
      </p>
      <div className="flex justify-end gap-2 mx-2">
        <button
          className="btn bg-slate-800"
          onClick={() => {
            props.proceed(false);
            const modal = document.getElementById("modal") as HTMLElement;
            modal.style.display = "none";
          }}
        >
          {props.cancelLabel || "cancel"}
        </button>
        <button
          className="btn"
          onClick={() => {
            props.proceed(true);
            const modal = document.getElementById("modal") as HTMLElement;
            modal.style.display = "none";
          }}
        >
          {props.okLabel || "ok"}
        </button>
      </div>
    </div>
  </>
);

export default confirmable(Confirmation);
