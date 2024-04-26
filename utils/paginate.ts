export function paginate(start: number, end: number, arr: any[]) {
  const pagi = [];
  let selisih = arr.length - start;
  const limit = end - start;
  if (selisih < limit) {
    while (selisih > 0) {
      pagi.push(arr[start]);
      start++;
      selisih--;
    }
    return pagi;
  }
  while (start < end) {
    pagi.push(arr[start]);
    start++;
  }
  return pagi;
}
