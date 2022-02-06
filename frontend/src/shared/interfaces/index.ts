export interface ApiValidationErrorsResponse {
  field: any;
  location: 'body' | 'params';
  message: string;
}

export interface ApiErrorResponse {
  errors?: ApiValidationErrorsResponse[];
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: ApiErrorResponse;
}
