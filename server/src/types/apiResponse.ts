export type ApiResponse<T = null> = {
  success: boolean;
  errorCode?: string;
  data?: T;
};
