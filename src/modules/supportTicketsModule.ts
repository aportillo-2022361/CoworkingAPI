export interface SupportTicket {
  id?: number;
  user_id: number;
  subject: string;
  description: string;
  status?: string;
}