import { Editor } from "@toast-ui/react-editor";
import { Dispatch, SetStateAction, RefObject } from "react";
import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
} from "react-hook-form";

import { CalendarType } from "../../../../common/types/calendar";

export interface FormValue {
  title: string;
  description: string;
}

export interface OtherPropsType {
  calendar: CalendarType;
  calendarDate: string;
  setCalendar: Dispatch<SetStateAction<CalendarType | undefined>>;
}

export interface PropsType {
  isLoading: boolean;
  error: string | null | undefined;
  clearError: () => void;
  register: UseFormRegister<FormValue>;
  handleSubmit: UseFormHandleSubmit<FormValue>;
  errors: FieldErrors<FormValue>;
  onUpdateCalendar: ({ title }: { title: string }) => void;
  onCreateCalendar: ({ title }: { title: string }) => void;
  showInformModal: boolean;
  closeInformModal: () => void;
  isEdit: boolean;
  toggleEditMode: Dispatch<SetStateAction<boolean>>;
  setShowInformModal: Dispatch<SetStateAction<boolean>>;
  props: OtherPropsType;
  editorRef: RefObject<Editor>;
  setIsDelete: Dispatch<SetStateAction<boolean>>;
}
