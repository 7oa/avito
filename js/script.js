const FOLDERS = {
  bowtie: "https://disk.yandex.ru/d/LjFrOTNwsCb4vg",
  tie: "https://disk.yandex.ru/d/lmlpUmQAwGglrA",
  child: "https://disk.yandex.ru/d/nRmvudSXCkuF9Q",
  belt: "https://disk.yandex.ru/d/A1yx7rL44e2JRg",
  gallery: "https://disk.yandex.ru/d/PpjBnhZsyDg67Q",
};

const DATA = {};

function getData(folder) {
  if (DATA[folder]) {
    appendImg(folder, DATA[folder]);
    return;
  }

  const xhr = new XMLHttpRequest();
  const url = `https://cloud-api.yandex.net/v1/disk/public/resources?public_key=${FOLDERS[folder]}&preview_size=XL&limit=100`;
  xhr.open("GET", url);
  xhr.send();
  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log("Ошибка: " + xhr.status);
      return;
    }

    const resp = JSON.parse(xhr.response);
    if (resp._embedded.items) {
      DATA[folder] = resp._embedded.items;
      appendImg(folder, resp._embedded.items);
    }
  };

  xhr.onprogress = function (event) {};

  xhr.onerror = function () {
    console.log("error");
  };
}

function appendImg(folder, elements) {
  if (!elements) return;
  document.querySelector(`.list`).innerHTML = "";
  for (x of elements) {
    const imgLink = `img/${folder}${x.path}`;
    const a = document.createElement("a");
    a.setAttribute("data-fslightbox", folder);
    a.href = imgLink;
    a.className = "image";

    const img = document.createElement("img");
    img.src = imgLink;
    a.appendChild(img);
    document.querySelector(`.list`).appendChild(a);
    refreshFsLightbox();
  }
}

function setActive(folder) {
  window.location.hash = folder;
  getData(folder);
  Array.prototype.forEach.call(
    document.querySelectorAll(".menu-item"),
    (el) => (el.style.textDecoration = "none")
  );
  document.querySelector(`.menu-item_${folder}`).style.textDecoration =
    "underline";
}

function navigate() {
  const locationHash = window.location.hash;
  if (locationHash) {
    setActive(locationHash.substring(1));
  } else {
    setActive("bowtie");
  }
}

navigate();
