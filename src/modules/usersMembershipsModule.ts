export interface UserMembership {
  id?: number;
  user_id: number;
  membership_id: number;
  start_date: Date | string;
  end_date: Date | string;
  is_active?: boolean;
}