Winter = {};
Winter.mousedown = 0;
Winter.CreateWindow = function(title) {
    var win = document.createElement("div");
    win.classList.add("winter-window");
    var titlebar = document.createElement("div");
    titlebar.classList.add("winter-window-title");
    titlebar.innerHTML = title;
    var closebtn = document.createElement("div");
    closebtn.classList.add("winter-window-title-close");
    closebtn.innerHTML = "&times;";
    titlebar.appendChild(closebtn);
    closebtn.onclick = function() {
        win.remove();
    }
    win.appendChild(titlebar);
    document.body.appendChild(win);

    function move(x, y) {
        win.style.top = y - 24 + "px";
        win.style.left = x - 32 + "px";
    }

    titlebar.onmousemove = function(e) {
        if(Winter.mousedown == 1) {
            move(e.clientX, e.clientY);
        }
    }

    titlebar.addEventListener("touchmove", function(e) {
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
    this.content.style.minWidth = w + "px";
}
Winter.App.prototype.setHeight = function(h) {
    this.content.style.minHeight = h + "px";
}
Winter.App.prototype.close = function() {
    this.content.remove();
}

Winter.WebApp = function(name, about, url) {
    Winter.App.call(this, name, about);
    this.frame = document.createElement("iframe");
    this.frame.style.border = 0;
    this.content.appendChild(this.frame);
    this.frame.src = url;
    this.frame.width = 200;
    this.frame.height = 200;
}
Winter.WebApp.prototype = Object.create(Winter.App.prototype);
Winter.WebApp.prototype.setWidth = function(w) {
    Winter.App.prototype.setWidth.call(this, w);
    this.frame.width = w;
}
Winter.WebApp.prototype.setHeight = function(h) {
    Winter.App.prototype.setHeight.call(this, h);
    this.frame.width = h;
}

Winter.Apps = {};
Winter.Apps.Browser = function(url) {
    this.app = new Winter.App("Browser", "Browse the web");
    this.address = document.createElement("input");
    this.address.value = "https://start.duckduckgo.com/";
    this.address.style.display = "block";
    this.address.style.width = "100%";
    this.address.style.padding = "8px";
    this.address.style.boxSizing = "border-box";
    var self = this;
    this.address.onkeypress = function(e) {
        if(e.keyCode == 13)
            self.goto(this.value);
    }
    this.address.style.border = 0;
    this.app.content.appendChild(this.address);
    this.frame = document.createElement("iframe");
    this.frame.style.border = 0;
    this.app.content.appendChild(this.frame);
    this.frame.src = "https://start.duckduckgo.com/";
    this.frame.width = "500px";
    this.frame.height = "500px";
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

window.addEventListener("load", function() {
    document.body.addEventListener("mousedown", function() { 
        Winter.mousedown = 1;
    });
    document.body.addEventListener("mouseup", function() {
        Winter.mousedown = 0;
    });
});
