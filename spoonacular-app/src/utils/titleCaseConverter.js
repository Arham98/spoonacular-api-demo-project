export default function titleCaseConverter(dataStr) {
  const newDataStr = dataStr.replaceAll('_', ' ');
  const words = newDataStr.split(' ');
  const upperCaseWords = words.map((word) => `${word.slice(0, 1).toLocaleUpperCase()}${word.slice(1)}`);
  const upperCaseString = upperCaseWords.join(' ');
  return upperCaseString;
}
