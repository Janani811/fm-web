export interface User {
  _id: string;
  us_email: string;
  us_is_active: boolean;
  us_is_deleted: boolean;
}
export interface ValidationErrors {
  error: string;
  field_errors: Record<string, string>;
  message: string;
}

export interface IError {
  _id: string;
  er_title: string;
  er_description: string;
  er_created_by: string;
  er_tags: string[];
  er_attachments: string[];
  er_is_deleted: number;
  er_created_at: Date;
}
