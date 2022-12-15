export default function htmlParser(dataStr) {
  let newDataStr = dataStr;
  newDataStr = dataStr.replaceAll('&gt;', '>');
  newDataStr = newDataStr.replaceAll('&lt;', '<');
  return newDataStr;
}
