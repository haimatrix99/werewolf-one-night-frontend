const MIN_PLAYERS = 3;
const MAX_PLAYERS = 10;

const ROLE_CARD: { [key: string]: number }  = {
  "Dân làng": 3,
  "Ma sói": 2,
  "Tiên tri": 1,
  "Đạo tặc": 1,
  "Kẻ gây rối": 1,
  "Bợm nhậu": 1,
  "Cú đêm": 1,
  "Kẻ mạo danh": 0,
  "Thợ săn": 0,
  "Thợ hồ": 0,
  "Kẻ phản bội": 0,
  "Kẻ chán đời": 0,
};

export { MIN_PLAYERS, MAX_PLAYERS, ROLE_CARD };