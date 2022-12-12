interface LedgerDto {
  id?: string;
  type: string;
  title: string;
  amount: number;
  category: string;
  user_id: string;
}

export { LedgerDto };
