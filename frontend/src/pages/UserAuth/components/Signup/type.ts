export interface PropsType {
  isLoading: Boolean;
  error: string | null | undefined;
  clearError: () => void;
  onSubmitSignup: (data: any) => void;
  imgFile: string | undefined;
  imgRef: any;
  savePreViewFile: () => void;
  checkExistingUser: (email: string | undefined) => Promise<any>;
}

export interface SignupDataType {
  email: string;
  nickName: string;
  password: string;
  image: Blob[];
}
