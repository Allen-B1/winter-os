Winter = {};
Winter.mousedown = 0;
Winter.CreateWindow = function(title) {
    var win = $("<div/>");
    win.addClass("winter-window");
    win.resizable();
    var titlebar = $("<div/>");
    titlebar.addClass("winter-window-title");
    var titletext = $("<span/>");
    titletext.addClass("winter-window-title-text");
    titletext.html(title);
    titletext.appendTo(titlebar);
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
        win.css("top", y + "px");
        win.css("left",x + "px");
    }

    win.draggable({
        handle: titlebar,
        start: function() {
            win.css("zIndex", "3");
        },
        stop: function() {
            win.css("zIndex", "2");
        }
    });

    titlebar.on("touchmove", function(e) {
        move(e.pageX, e.pageY);
        e.preventDefault();
    });
    return win;
}
Winter.App = function(name) {
    this.name = name;
    this.content = Winter.CreateWindow(name);
}
Winter.App.prototype.setMinWidth = function(w) {
    this.content.css("minWidth", w + "px");
}
Winter.App.prototype.setMinHeight = function(h) {
    this.content.css("minHeight", h + "px");
}
Winter.App.prototype.close = function() {
    this.content.remove();
}
Winter.App.prototype.titlecolor = function(color) {
    this.content.find(".winter-window-title").css("background", color);
}

Winter.WebApp = function(name, url) {
    Winter.App.call(this, name);
    this.frame = $("<iframe/>");
    this.frame.css("border", 0);
    this.frame.appendTo(this.content);
    this.frame.attr("src", url);
    var self = this;
    this.content.on( "resize", function( event, ui ) {
        self.frame.attr("width", ui.size.width);
        self.frame.attr("height", ui.size.height - self.content.find(".winter-window-title").innerHeight());
    });
}
Winter.WebApp.prototype = Object.create(Winter.App.prototype);
Winter.WebApp.prototype.setMinWidth = function(w) {
    Winter.App.prototype.setMinWidth.call(this, w);
    this.frame.css("minWidth", w + "px");
}
Winter.WebApp.prototype.setMinHeight = function(h) {
    Winter.App.prototype.setMinHeight.call(this, h);
    this.frame.css("minHeight", h - this.content.find(".winter-window-title").innerHeight() + "px");
}

Winter.Apps = {};
Winter.Apps.Browser = function(url) {
    this.app = new Winter.App("Browser");
    this.app.titlecolor("#455a64");
    this.address = $("<input type=\"text\"/>");
    this.address.val("https://start.duckduckgo.com/");
    this.address.css("display", "block");
    this.address.css("width", "100%");
    this.address.css("padding", "8px");
    this.address.css("boxSizing", "border-box");
    this.address.css("color", "#fff");  
    this.address.css("background", "#607d8b");
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
    this.frame.attr("height", "400px");
    this.app.setMinWidth(500);
    this.app.setMinHeight(400);
    this.frame.css("minWidth", 500 + "px");
    this.frame.css("minHeight", 400 - this.app.content.find(".winter-window-title").innerHeight() - this.app.content.find("input").innerHeight() + "px");
    this.app.content.on( "resize", function( event, ui ) {
        self.frame.attr("width", ui.size.width);
        self.frame.attr("height", ui.size.height - self.app.content.find(".winter-window-title").innerHeight() - self.app.content.find("input").innerHeight());
    });
}

Winter.Apps.Browser.prototype.goto = function(query) {
    if(query.indexOf("http") == 0)
        this.frame.attr("src", query);
    else
        this.frame.attr("src", "https://duckduckgo.com/?q=" + query);
}

Winter.Apps[2048] = function() {
    this.app = new Winter.WebApp("2048", "https://gabrielecirulli.github.io/2048/");
    this.app.setMinWidth(350);
    this.app.setMinHeight(350);
    this.app.titlecolor("#fb8c00");
}

Winter.Apps.Maps = function() {
    this.app = new Winter.WebApp("Maps");
}

$(document).ready(function() {
// start screen
    var screen = $("<div/>");
    screen.css("width", "100%");
    screen.css("height", "100%");
    screen.css("top", "0");
    screen.css("left", "0");
    screen.css("position", "fixed");
    screen.css("background", "#03a9f4");
    screen.css("padding","0");
    var text = $("<div/>");
    text.css("font-size", "50px");
    text.css("line-height", window.innerHeight + "px");
    text.css("text-align", "center");
    text.css("white-space", "nowrap");
    text.css("color", "#fff");
    text.css("height", "100%");
    text.appendTo(screen);
    text.html("Winter OS");
    screen.appendTo(document.body);
    setTimeout(function() {
        screen.fadeOut();
    }, 1000);
});
