function getCatalog(folder) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `./img/${folder}`, true);
  xhr.responseType = "document";
  xhr.onload = () => {
    if (xhr.status === 200) {
      const elements = xhr.response.getElementsByTagName("a");
    //   const tt = [...elements].sort((a, b) => (a.title - b.title ? -1 : 1));
    //   console.dir(elements);
      document.querySelector(`.list`).innerHTML = "";
      for (x of elements) {
        if (x.href.match(/\.(jpe?g|png|gif)$/i)) {
          const a = document.createElement("a");
          a.setAttribute("data-fslightbox", folder);
          a.href = x.href;
          a.className = "image";

          const img = document.createElement("img");
          img.src = x.href;
          a.appendChild(img);
          document.querySelector(`.list`).appendChild(a);
          refreshFsLightbox();
        }
      }
    } else {
      alert("Request failed. Returned status of " + xhr.status);
    }
  };
  xhr.send();
}

function setActive(folder) {
  //   Array.prototype.forEach.call(
  //     document.querySelectorAll(".list"),
  //     (el) => (el.style.display = "none")
  //   );
  getCatalog(folder);
  Array.prototype.forEach.call(
    document.querySelectorAll(".menu-item"),
    (el) => (el.style.textDecoration = "none")
  );
  //   document.querySelector(`.${folder}`).style.display = "grid";
  document.querySelector(`.menu-item_${folder}`).style.textDecoration =
    "underline";
}

// getCatalog("bowtie");
// getCatalog("tie");
// getCatalog("child");
// getCatalog("gallery");
setActive("bowtie");
