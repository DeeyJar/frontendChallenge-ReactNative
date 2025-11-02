export type IFormData = {
  title: string;
  description: string;
  priority: string;
  category: string;
};

export type Field = keyof IFormData;
