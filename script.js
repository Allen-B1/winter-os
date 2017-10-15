Winter = {};
Winter.CreateWindow = function(title) {
  var win = document.createElement("div");
  win.classList.add("winter-window");
}
Winter.App = function(name) {
  this.name = name;
  Winter.CreateWindow(name);
}
