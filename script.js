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

    win.onmousemove = function(e) {
        if(Winter.mousedown == 1) {
            win.style.top = e.clientY - 24 + "px";
            win.style.left = e.clientX - 32 + "px";
        }
    }
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

Winter.Apps = {};
Winter.Apps.Browser = function(url) {
    this.app = new Winter.App("Browser", "Browse the web");
    this.frame = document.createElement("iframe");
    this.frame.style.border = 0;
    this.app.content.appendChild(this.frame);
    this.frame.src = "https://start.duckduckgo.com/";
    this.frame.width = "400px";
    this.frame.height = "500px";
    this.app.setWidth(400);
    this.app.setHeight(500);
}

window.addEventListener("load", function() {
    document.body.addEventListener("mousedown", function() { 
        Winter.mousedown = 1;
    });
    document.body.addEventListener("mouseup", function() {
        Winter.mousedown = 0;
    });
});
