export interface ICardProps<TData> {
  cardItem: TData;
  action?: (id: number) => void;
  actionText?: string;
}
