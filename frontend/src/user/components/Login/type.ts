export interface PropsType {
  isLoading: Boolean;
  error: string | null | undefined;
  clearError: () => void;
  onSubmit: (data: any) => void;
}
