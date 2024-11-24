export interface User {
  _id: string;
  us_email: string;
  us_is_active: boolean;
  us_is_deleted: boolean;
}
export interface ValidationErrors {
  error: string;
  field_errors: Record<string, string>;
}
