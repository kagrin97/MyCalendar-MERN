export interface PropsType {
  isLoading: Boolean;
  error: string | null | undefined;
  clearError: () => void;
  onSubmit: (data: LoginDataType) => void;
}

export interface LoginDataType {
  email: string;
  password: string;
}
