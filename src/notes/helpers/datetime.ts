function toUnixTimestamp(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

function unixTimestamp(): number {
  return toUnixTimestamp(new Date());
}

export { toUnixTimestamp, unixTimestamp };
