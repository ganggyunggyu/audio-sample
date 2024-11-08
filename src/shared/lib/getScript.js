export const getKoreanScript = ({ script }) => {
  return script.replace(/['a-zA-Z]/g, '');
};

export const getScriptList = ({ scriptList }) => {
  return scriptList.split('\n').filter((line) => line.trim() !== '');
};
