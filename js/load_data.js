function loadFiles(number) {
 console.log("test " + number);

 console.log(dataStr[number]);

 var html = [];
 html.push("<ul class=\"row grid cs-style-2\">");

 var list = dataStr[number].split("<br>");
 console.log(list);
 for (var i = 0; i < list.length - 1; i++) {
    var data = list[i].split(" ");
    console.log(data);
    var filename = "photo/" + number + "/" + data[0];
    var filename_s = "photo/" + number + "/s_" + data[0];
    var title = "";
    var desc = "";
    if (data.length > 1) title = data[1];
    if (data.length > 2) desc = data[2];
    //console.log(filename);
    //console.log(filename_s);
    var single = [];
    single.push("<li class=\"col-md-2 post\"><figure>");
    single.push("<img src=\"" + filename_s + "\", ");
    single.push("bigimage=\"" + filename + "\">");
    single.push("<figcaption> <h3>" + title + "</h3> <span>" + desc + "</span>");
    single.push("</figcaption></figure></li>");
    //console.log(single.join(' '));
    html.push(single.join(''));
 }
 
  html.push("</ul>");
  $('#amazing_wall').html(html.join(''));
}