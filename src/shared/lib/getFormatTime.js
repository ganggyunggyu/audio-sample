export const getFormatTime = ({ second }) => {
  const minutes = Math.floor(second / 60);
  const seconds = Math.floor(second % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0',
  )}`;
};
