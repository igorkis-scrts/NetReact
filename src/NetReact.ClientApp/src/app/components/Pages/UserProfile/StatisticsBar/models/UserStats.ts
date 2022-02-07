export class UserStats {
  wishlist: number | null;
  bookshelf: number | null;
  requests: number | null;
  requested: number | null;
  awaiting: number | null;
  sent: number | null;

  constructor(item?: UserStats) {
    if(item) {
      this.wishlist = item.wishlist;
      this.bookshelf = item.bookshelf;
      this.requests = item.requests;
      this.requested = item.requested;
      this.awaiting = item.awaiting;
      this.sent = item.sent;
    } else {
      this.wishlist = null;
      this.bookshelf = null;
      this.requests = null;
      this.requested = null;
      this.awaiting = null;
      this.sent = null;
    }
  }
}