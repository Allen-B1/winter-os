Winter = {};
Winter.mousedown = 0;
Winter.CreateWindow = function(title) {
    var win = $("<div/>");
    win.addClass("winter-window");
    var titlebar = $("<div/>");
    titlebar.addClass("winter-window-title");
    titlebar.html(title);
    var closebtn = $("<div/>");
    closebtn.addClass("winter-window-title-close");
    closebtn.html("&times;");
    closebtn.appendTo(titlebar);
    closebtn.click(function() {
        setTimeout(function() {win.remove();}, 100);
    });
    titlebar.appendTo(win);
    win.appendTo($(document.body));

    function move(x, y) {
        win.css("top", y - 24 + "px");
        win.css("left",x - 32 + "px");
    }

    titlebar.mousemove(function(e) {
        if(Winter.mousedown == 1) {
            move(e.clientX, e.clientY);
        }
    });

    titlebar.on("touchmove", function(e) {
        move(e.pageX, e.pageY);
    });
    return win;
}
Winter.App = function(name, about) {
    this.name = name;
    this.about = about;
    this.content = Winter.CreateWindow(name);
}
Winter.App.prototype.setWidth = function(w) {
    this.content.css("minWidth", w + "px");
}
Winter.App.prototype.setHeight = function(h) {
    this.content.css("minHeight", h + "px");
}
Winter.App.prototype.close = function() {
    this.content.remove();
}

Winter.WebApp = function(name, about, url) {
    Winter.App.call(this, name, about);
    this.frame = $("<iframe/>");
    this.frame.css("border", 0);
    this.frame.appendTo(this.content);
    this.frame.attr("src", url);
    this.frame.attr("width", 200);
    this.frame.attr("height", 200);
}
Winter.WebApp.prototype = Object.create(Winter.App.prototype);
Winter.WebApp.prototype.setWidth = function(w) {
    Winter.App.prototype.setWidth.call(this, w);
    this.frame.attr("width", w);
}
Winter.WebApp.prototype.setHeight = function(h) {
    Winter.App.prototype.setHeight.call(this, h);
    this.frame.attr("height", h);
}

Winter.Apps = {};
Winter.Apps.Browser = function(url) {
    this.app = new Winter.App("Browser", "Browse the web");
    this.address = $("<input type=\"text\"/>");
    this.address.val("https://start.duckduckgo.com/");
    this.address.css("display", "block");
    this.address.css("width", "100%");
    this.address.css("padding", "8px");
    this.address.css("boxSizing", "border-box");
    var self = this;
    this.address.keypress(function(e) {
        if(e.keyCode == 13)
            self.goto(this.value);
    });
    this.address.css("border", 0);
    this.address.appendTo(this.app.content);
    this.frame = $("<iframe/>");
    this.frame.css("border", "0");
    this.frame.appendTo(this.app.content);
    this.frame.attr("src", "https://start.duckduckgo.com/");
    this.frame.attr("width", "500px");
    this.frame.attr("height", "500px");
    this.app.setWidth(500);
    this.app.setHeight(500);
}

Winter.Apps.Browser.prototype.goto = function(query) {
    if(query.indexOf("http") == 0)
        this.frame.src = query;
    else
        this.frame.src = "https://duckduckgo.com/?q=" + query;
}

Winter.Apps[2048] = function() {
    this.app = new Winter.WebApp("2048", "1024 clone", "https://gabrielecirulli.github.io/2048/");
    this.app.setWidth(300);
}

$(document).ready(function() {
    $(document.body).mousedown(function() { 
        Winter.mousedown = 1;
    });
    $(document.body).mouseup(function() {
        Winter.mousedown = 0;
    });
});
