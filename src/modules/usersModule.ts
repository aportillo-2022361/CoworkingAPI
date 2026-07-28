export interface User {
  id?: number;
  full_name: string;
  email: string;
  card_access_key?: string | null;
  created_at?: Date;
}