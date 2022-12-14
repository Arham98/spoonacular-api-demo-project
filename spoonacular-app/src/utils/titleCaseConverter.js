export default function titleCaseConverter(dataStr) {
  const words = dataStr.split(' ');
  const upperCaseWords = words.map((word) => {
    return `${word.slice(0,1).toLocaleUpperCase()}${word.slice(1)}`;
  });
  const upperCaseString = upperCaseWords.join(' ');
  return upperCaseString;
}
