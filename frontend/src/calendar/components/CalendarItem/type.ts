import { Dispatch, SetStateAction } from "react";

export interface PropsType {
  isLoading: Boolean;
  error: string | null | undefined;
  clearError: () => void;
  register: any;
  handleSubmit: any;
  errors: any;
  onUpdateCalendar: (data: any) => void;
  onCreateCalendar: (data: any) => void;
  showInformModal: Boolean;
  closeInformModal: () => void;
  isEdit: Boolean;
  toggleEditMode: Dispatch<SetStateAction<boolean>>;
  setShowInformModal: Dispatch<SetStateAction<boolean>>;
  props: any;
  editorRef: any;
  setIsDelete: Dispatch<SetStateAction<boolean>>;
}
