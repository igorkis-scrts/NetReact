export function countPages(total: number, pageSize: number) {
  return Math.ceil(total / (pageSize));
}