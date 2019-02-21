function search_pairs() {
  var rangeList = SpreadsheetApp.getActiveRangeList().getRanges();
  if(rangeList.length != 2) {
    return;
  }
  
  var range1 = rangeList[0];
  var range2 = rangeList[1];
  
  var wrap_values = function(list) {
    var ret = new Array();
    for(var i = 1; i <= list.length; i++) {
      var val = list[i - 1][0];
      if(val.toString().trim() != "") {
        ret.push({"val": val, "n": i, "paired": false});
      }
    }
    return ret;
  };
  
  var values1 = wrap_values(range1.getValues());
  var values2 = wrap_values(range2.getValues());
  
  var comparator = function(a, b) {
    return parseFloat(a.val) - parseFloat(b.val);
  };
  
  values1.sort(comparator);
  values2.sort(comparator);
  
  var i1 = 0;
  var i2 = 0;
  
  while(i1 < values1.length && i2 < values2.length) {
    if (values1[i1].val < values2[i2].val) {
      i1++;
    } else if(values1[i1].val > values2[i2].val) {
      i2++;
    } else {
      values1[i1].paired = true;
      values2[i2].paired = true;
      i1++;
      i2++;
    }
  }
  
  var highlight = function(list, range) {
    for(var i = 0; i < list.length; i++) {
      if(list[i].paired) {
        range.getCell(list[i].n, 1).setBackground('#ffff00')
      }
    }
  };
  
  highlight(values1, range1);
  highlight(values2, range2);
};
