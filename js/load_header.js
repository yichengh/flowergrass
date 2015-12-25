    $(document).ready(function(){
        loadHeader();
    });

function loadHeader() {
    var html_logo = [];
    html_logo.push("\
    <a href=\"\"> \
    <img src=\"images/site-logo.png\" height=\"40px\" /> \
    </a>");

    var html_menu = [];
    html_menu.push("\
    <ul> \
        <li> \
            <a href=\"index.html\">About</a> \
        </li> \
        <li> \
            <a href=\"time.html\">Time</a> \
        </li> \
        <li> \
            <a href=\"moments.html\">Moments</a> \
        </li> \
        <li> \
            <a href=\"videos.html\">Videos</a> \
        </li> \
    </ul> ");

    var html_description = [];
    html_description.push("A smart minimal portfolio theme specially made for designers & photographers.");

    var html_footer = [];
    html_footer.push("\
    <div class=\"site-social\"> \
    <ul> \
        <a href=\"http://weibo.com/u/2095764045\"> \
        <li> <i class=\"pe-so-weibo pe-lg pe-va\"> \
        </i> </li> </a>\
        <a href=\"https://www.facebook.com/yicheng.huang.75\"> \
        <li> <i class=\"pe-so-facebook pe-lg pe-va\"> \
        </i> </li> </a>\
    </ul> \
    </div>");

    html_footer.push("\
    <p>Built by <a href=mailto:anorange0409@gmail.com>anorange0409</a>\
    <p> \
    HTML Theme by \
    <a href=\"http://themeraid.com\">ThemeRaid</a> \
    </p>");
    $('.site-header .site-logo').html(html_logo.join(''));
    $('.site-header .menu').html(html_menu.join(''));
    $('.site-header #site_description').html(html_description.join(''));
    $('.site-header .site-footer').html(html_footer.join(''));
}