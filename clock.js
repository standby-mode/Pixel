var clock = document.querySelector("#utility-clock");
utilityClock(clock);
resize(clock);

function utilityClock(container) {
  var dynamic = container.querySelector(".dynamic");
  var hourElement = container.querySelector(".hour");
  var minuteElement = container.querySelector(".minute");
  var secondElement = container.querySelector(".second");
  var minute = function (n) {
    return 0 === n % 5 ? minuteText(n) : minuteLine(n);
  };
  var minuteText = function (n) {
    var anchor = document.createElement("div");
    anchor.className = "anchor";
    var element = document.createElement("div");
    element.className = "element minute-line-long";
    rotate(anchor, n);
    anchor.appendChild(element);
    dynamic.appendChild(anchor);
  };
  var minuteLine = function (n) {
    var anchor = document.createElement("div");
    anchor.className = "anchor";
    var element = document.createElement("div");
    element.className = "element minute-line";
    rotate(anchor, n);
    anchor.appendChild(element);
    dynamic.appendChild(anchor);
  };
  var hour = function (n) {
    var element = document.createElement("div");
    element.className = "hour-text hour-" + n;
    element.innerHTML = n;
    position(element, n / 12, 105);
    dynamic.appendChild(element);
  };
  var position = function (element, phase, r) {
    var theta = phase * 2 * Math.PI;
    element.style.top = (-r * Math.cos(theta)).toFixed(1) + "px";
    element.style.left = (r * Math.sin(theta)).toFixed(1) + "px";
  };
  var rotate = function (element, second) {
    var rotation = second * 6
    var rotation2 = rotation - 9.54
    element.style.transform = element.style.webkitTransform =
      "rotate(" + rotation2 + "deg)";
  };
  var rotateSeconds = function (element, second) {
    var rotation = second * 6
    element.style.transform = element.style.webkitTransform =
      "rotate(" + rotation + "deg)";
  };
  var animate = function () {
    var now = new Date();
    var time =
      now.getHours() * 3600 +
      now.getMinutes() * 60 +
      now.getSeconds() +
      now.getMilliseconds() / 1000;
    rotateSeconds(secondElement, time);
    rotate(minuteElement, time / 60);
    rotate(hourElement, time / 60 / 12);
    requestAnimationFrame(animate);
  };
  for (var i = 1; i <= 60; i++) {
    minute(i);
  }
  for (var i = 1; i <= 12; i++) {
    hour(i);
  }
  animate();
}

function resize(element, size) {
  element.style.transform = element.style.webkitTransform = `scale("${300 / size})`;
  console.log("resized")
}


function checkClockHolderDimensions() {
  const clockHolder = document.querySelector(".clock-holder");
  const clock = document.getElementById("utility-clock");

  if (!clockHolder) {
    console.error("Element .clock-holder not found.");
    return;
  }

  const width = clockHolder.offsetWidth;
  const height = clockHolder.offsetHeight;

  if (width > height) {
    resize(clock, window.width / 2);
  } else if (height > width) {
    resize(clock, window.innerHeight);
  } else {
    resize(clock, window.innerHeight);
  }
}


checkClockHolderDimensions();
