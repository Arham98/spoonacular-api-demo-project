export default function htmlParser(dataStr) {
  let newDataStr = dataStr;
  newDataStr = dataStr.replaceAll('&gt;', '>');
  newDataStr = newDataStr.replaceAll('&lt;', '<');
  console.log(decodeURI(dataStr));
  return newDataStr;
}
