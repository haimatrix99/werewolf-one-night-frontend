const MIN_PLAYERS = 3;
const MAX_PLAYERS = 10;

const ROLE_CARD: { [key: string]: number } = {
  "Dân làng": 3,
  "Ma sói": 2,
  "Tiên tri": 1,
  "Đạo tặc": 1,
  "Kẻ gây rối": 1,
  "Bợm nhậu": 1,
  "Cú đêm": 1,
  "Kẻ mạo danh": 1,
  "Thợ săn": 1,
  "Thợ hồ": 2,
  "Kẻ phản bội": 1,
  "Kẻ chán đời": 1,
};

const SOUNDS: { [key: string]: string } = {
  "Kiểm tra bài": "/sounds/Kiểm tra bài.mp3",
  "Kẻ mạo danh": "/sounds/Kẻ mạo danh.mp3",
  "Ma sói": "/sounds/Ma sói.mp3",
  "Kẻ phản bội": "/sounds/Kẻ phản bội.mp3",
  "Thợ hồ": "/sounds/Thợ hồ.mp3",
  "Tiên tri": "/sounds/Tiên tri.mp3",
  "Đạo tặc": "/sounds/Đạo tặc.mp3",
  "Kẻ gây rối": "/sounds/Kẻ gây rối.mp3",
  "Bợm nhậu": "/sounds/Bợm nhậu.mp3",
  "Cú đêm": "/sounds/Cú đêm.mp3",
  "Thảo luận": "/sounds/Thảo luận.mp3",
};

export { MIN_PLAYERS, MAX_PLAYERS, ROLE_CARD, SOUNDS };
