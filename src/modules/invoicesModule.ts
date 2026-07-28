export interface Invoice {
  id?: number;
  user_id: number;
  amount: number;
  status?: string;
}