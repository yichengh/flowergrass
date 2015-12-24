var data = [];

var dataStr = "1.cover<br><br>\
October 2015 @ Shenzhen\
<br><br><br>\
2.cover<br><br>\
October 2015 @ Kowloon & Central, HongKong\
<br><br><br>\
3.cover<br><br>\
October 2015 @ Hong Kong Disneyland\
<br><br><br>\
4.cover<br><br>\
November 2015 @ Beijing\
<br><br><br>\
5.cover<br><br>\
December 2015 @ Shenzhen\
"
var d = dataStr.split("<br><br><br>");
for(var i = 0; i<d.length; i++){
  var c = d[i].split("<br><br>");
  data.push({
    img: c[0]+ ".JPG",
    caption: c[1],
    desc: c[1]
  });
}

