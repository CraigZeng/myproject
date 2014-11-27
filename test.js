var compile = function(template){
  var length = template.length;
  var outputStr = 'var result = "";';
  var tokenReg = /<%(.*?[^#])%>/g;
  var start = 0, end = 0;
  var dealJsStr = function(str){
    var firstChar = str.charAt(0);
    if (firstChar == '=') {
      return 'result = result + (' + str.substring(1) + ');';
    }
    return str;
  };
  template.replace(tokenReg, function(matchStr, groupStr, matchPos){
    end = matchPos;
    outputStr = outputStr + 'result = result + \'' + template.substring(start, end) + '\';';
    outputStr = outputStr + dealJsStr(groupStr); 
    start = end + matchStr.length;
  });
  outputStr = outputStr + 'result = result + \'' + template.substring(start) + '\';';
  return new Function(outputStr + ';return result;');
}
