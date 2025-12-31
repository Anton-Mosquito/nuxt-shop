/**
 * Review form data
 */
export interface ReviewFormData {
  name: string;
  email: string;
  rating: number;
  comment: string;
  saveData?: boolean;
}

export interface ReviewFormEmits{
  submit: [data: ReviewFormData];
}