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
    closebtn.addClass("material-icons");
    closebtn.html("&#xe5cd;");
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
    this.titlebar.css("background", color);
}
Winter.App.prototype.__defineGetter__("titlebar", function() {
    return this.content.find(".winter-window-title");
});

Winter.WebApp = function(name, url) {
    Winter.App.call(this, name);
    this.frame = $("<iframe/>");
    this.frame.css("border", 0);
    this.frame.appendTo(this.content);
    this.frame.attr("src", url);
    var self = this;
    this.content.on( "resize", function( event, ui ) {
        self.frame.attr("width", ui.size.width);
        self.frame.attr("height", ui.size.height - self.titlebar.innerHeight());
    });
}
Winter.WebApp.prototype = Object.create(Winter.App.prototype);
Winter.WebApp.prototype.setMinWidth = function(w) {
    Winter.App.prototype.setMinWidth.call(this, w);
    this.frame.css("minWidth", w + "px");
}
Winter.WebApp.prototype.setMinHeight = function(h) {
    Winter.App.prototype.setMinHeight.call(this, h);
    this.frame.css("minHeight", h - this.titlebar.innerHeight() + "px");
}

Winter.Apps = {};
Winter.Apps.Browser = function(url) {
    this.app = new Winter.App("Browser");
    this.app.titlecolor("#455a64");
    this.toolbar = $("<div/>");
    this.toolbar.css("background", "#607d8b");
    this.toolbar.appendTo(this.app.content);
    this.address = $("<input type=\"text\"/>");
    this.address.val("https://start.duckduckgo.com/");
    this.address.css("display", "inline-block");
    this.address.css("width", "80%");
    this.address.css("color", "#fff");  
    this.address.css("background", "transparent");
    this.address.css("padding", "8px 12px");
    this.address.css("font-size", "14px");
    this.address.css("outline", "0");
    var self = this;
    this.address.keypress(function(e) {
        if(e.keyCode == 13)
            self.goto(this.value);
    });
    this.address.css("border", 0);
    this.address.appendTo(this.toolbar);

    this.backbtn = $("<button/>");
    this.backbtn.addClass("winter-toolbar-button");
    this.backbtn.addClass("material-icons");
    this.backbtn.css("float", "right");
    this.backbtn.css("color", "#fff");
    this.backbtn.html("&#xe5c4;");
    
    this.backbtn.css("padding", "8px 12px");
    this.backbtn.css("font-size", "19px");

    this.backbtn.click(function() {
        try {
            self.frame[0].contentWindow.history.back();
        } catch(err) {
            console.error("Unable to go back: " + err);
        }
    });
    this.backbtn.appendTo(this.toolbar);

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

    this.frame.on("load", function load() {
        try {
            self.address.val(this.contentWindow.location.href);
        } catch(err) {
            console.error("Unable to get page url: " + err);
        }
    });
}

Winter.Apps.Browser.prototype.goto = function(query) {
    var url = "";
    if(query.indexOf("http") == 0)
        url = query;
    else
        url = "https://duckduckgo.com/?q=" + query;
    this.frame.attr("src", url);
    this.address.val(url);
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
});
