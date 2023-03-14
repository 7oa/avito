function getCatalog(folder, elements) {
  document.querySelector(`.list`).innerHTML = "";
  for (x of elements) {
    const a = document.createElement("a");
    a.setAttribute("data-fslightbox", folder);
    a.href = x.preview;
    a.className = "image";

    const img = document.createElement("img");
    img.src = x.preview;
    a.appendChild(img);
    document.querySelector(`.list`).appendChild(a);
    refreshFsLightbox();
  }

  // const xhr = new XMLHttpRequest();
  // xhr.open("GET", `./img/${folder}`, true);
  // xhr.responseType = "document";
  // xhr.onload = () => {
  //   if (xhr.status === 200) {
  //     const elements = xhr.response.getElementsByTagName("a");
  //     //   const tt = [...elements].sort((a, b) => (a.title - b.title ? -1 : 1));
  //     //   console.dir(elements);
  //     document.querySelector(`.list`).innerHTML = "";
  //     for (x of elements) {
  //       if (x.href.match(/\.(jpe?g|png|gif)$/i)) {
  //         const a = document.createElement("a");
  //         a.setAttribute("data-fslightbox", folder);
  //         a.href = x.href;
  //         a.className = "image";

  //         const img = document.createElement("img");
  //         img.src = x.href;
  //         a.appendChild(img);
  //         document.querySelector(`.list`).appendChild(a);
  //         refreshFsLightbox();
  //       }
  //     }
  //   } else {
  //     alert("Request failed. Returned status of " + xhr.status);
  //   }
  // };
  // xhr.send();
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
// setActive("bowtie");

const FOLDERS = {
  bowtie: "https://disk.yandex.ru/d/_0u0RFe8mGsYlA",
  tie: "https://disk.yandex.ru/d/_0u0RFe8mGsYlA",
};

function getData(folder) {
  let xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    `https://cloud-api.yandex.net/v1/disk/public/resources?public_key=${FOLDERS[folder]}&preview_size=XL`
  );

  xhr.send();

  xhr.onload = function () {
    if (xhr.status != 200) {
      // HTTP ошибка?
      // обработаем ошибку
      alert("Ошибка: " + xhr.status);
      return;
    }

    // получим ответ из xhr.response
    const resp = JSON.parse(xhr.response);
    // console.log(resp._embedded.items);
    getCatalog(folder, resp._embedded.items);
  };

  xhr.onprogress = function (event) {
    // выведем прогресс
    // alert(`Загружено ${event.loaded} из ${event.total}`);
  };

  xhr.onerror = function () {
    // обработаем ошибку, не связанную с HTTP (например, нет соединения)
  };
}

getData("bowtie");
