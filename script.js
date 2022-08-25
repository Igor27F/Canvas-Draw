const canvas = document.querySelector("#canvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
const penColor = document.querySelector('input[name="penColor"]');
const penWidth = document.querySelector('input[name="penWidth"]');
const freeModeButton = document.getElementById("buttonFreeMode");
const linesModeButton = document.getElementById("buttonLinesMode");
const coordinateX = document.getElementById("mouseX");
const coordinateY = document.getElementById("mouseY");
const saver = document.getElementById("saver");

ctx.strokeStyle = penColor.value;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = penWidth.value;
let pen = {
  x: 0,
  y: 0,
  down: false,
  mode: "free",
};

saver.addEventListener("click", saveFile);
canvas.addEventListener("mousedown", penDown);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseout", mouseOut);

function mouseOut() {
  pen.down = false;
  canvas.style.cursor = "crosshair";
  coordinateX.innerHTML = "x:";
  coordinateY.innerHTML = "y:";
}

function stopDraw() {
  if (pen.mode == "free") {
    pen.down = false;
    canvas.style.cursor = "crosshair";
  }
}

function draw(e) {
  coordinateX.innerHTML = "x: " + e.offsetX;
  coordinateY.innerHTML = "y: " + e.offsetY;
  if (pen.down && pen.mode == "free") {
    ctx.moveTo(pen.x, pen.y);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [pen.x, pen.y] = [e.offsetX, e.offsetY];
  }
}

function penDown(e) {
  [pen.x, pen.y] = [e.offsetX, e.offsetY];
  ctx.lineWidth = penWidth.value;
  ctx.strokeStyle = penColor.value;
  if (pen.mode == "free") {
    pen.down = true;
    ctx.beginPath();
    canvas.style.cursor = "none";
  } else if (pen.mode == "line") {
    if (pen.down == false) {
      pen.down = true;
      ctx.beginPath();
      ctx.moveTo(pen.x, pen.y);
    } else {
      pen.down = false;
      //ctx.moveTo(pen.x, pen.y);
      ctx.lineTo(pen.x, pen.y);
      ctx.stroke();
    }
  }
}

function saveFile() {
  let image = canvas.toDataURL();
  let a = document.createElement("a");
  a.setAttribute("download", "image.png");
  a.setAttribute(
    "href",
    canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
  );
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  document.getElementById("myImage").src = image;
  a.remove();
}

function modeSelected(mode) {
  pen.mode = mode;
  mode == "line"
    ? ((freeModeButton.className = ""),
      (linesModeButton.className = "selectedButton"))
    : ((linesModeButton.className = ""),
      (freeModeButton.className = "selectedButton"));
}

function clearScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function customDraw() {
  ctx.lineWidth = penWidth.value;
  ctx.strokeStyle = penColor.value;
  ctx.beginPath();
  ctx.moveTo(
    document.querySelector('input[name="inputStartX"]').value,
    document.querySelector('input[name="inputStartY"]').value
  );
  ctx.lineTo(
    document.querySelector('input[name="inputEndX"]').value,
    document.querySelector('input[name="inputEndY"]').value
  );
  ctx.stroke();
}
