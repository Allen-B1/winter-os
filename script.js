Winter = {};
Winter.CreateWindow = function(title) {
  var win = document.createElement("div");
  win.classList.add("winter-window");
  var titlebar = document.createElement("div");
  titlebar.classList.add("winter-window-title");
  titlebar.innerHTML = title;
  win.appendChild(titlebar);
  document.body.appendChild(win);
}
Winter.App = function(name, about) {
  this.name = name;
  this.about = about;
  Winter.CreateWindow(name);
}
