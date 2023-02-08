export interface PropsType {
  isLoading: Boolean;
  error: string | null | undefined;
  clearError: () => void;
  onSubmitSignup: (data: any) => void;
  imgFile: string;
  imgRef: any;
  savePreViewFile: () => void;
  checkExistingUser: (email: string | undefined) => Promise<any>;
}
