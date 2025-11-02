import * as yup from 'yup';

export const taskSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be less than 50 characters'),
  
  description: yup
    .string()
    .optional()
    .max(200, 'Description must be less than 200 characters'),
  
  priority: yup
    .string()
    .required('Priority is required'),
  
  category: yup
    .string()
    .required('Category is required')
  
});

export type TaskFormData = yup.InferType<typeof taskSchema>;