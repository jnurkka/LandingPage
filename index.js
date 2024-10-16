function vh(percent) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (percent * h) / 100;
}

window.onscroll = function() {
  if (window.pageYOffset <= vh(2)) {
    document.getElementById("sticky-heading").style.top = "8vw";
    document.getElementById("greeting").innerText = "Moi, I'm Jaakko 👋";
    document.getElementById("job-title").style.top = "14vw";
    document.getElementById("job-title").style.opacity = "100%";
  } else {
    document.getElementById("sticky-heading").style.top = "2vh";
    document.getElementById("greeting").innerText = "Jaakko Nurkka";
    document.getElementById("job-title").style.top = "0";
    document.getElementById("job-title").style.opacity = "0%";
  }
}