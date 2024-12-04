const handleSubmit = async (event) => {
  event.preventDefault();

  if (!event.target.url.value) {
    document.querySelector(".form__error--url").innerText =
      "Please add a URL you'd like to check";
    return;
  }

  const firstResponse = await axios.post(
    `http://localhost:3000/scan?url=${event.target.url.value}`
  );

  console.log(firstResponse);

  const secondResponse = await axios.get(
    `http://localhost:3000/result?scan_id=${firstResponse.data.scan_id}`
  );

  console.log(secondResponse);

  let virusTotalResult = function () {
    if (event.target.url.value === "google.com") {
      return (virusTotalResult = secondResponse.data.scans.AlienVault.result);
    } else {
      return (virusTotalResult = secondResponse.data.scans.AlphaSOC.result);
    }
  };
  // let virusTotalResult = secondResponse.data.scans.AlphaSOC.result;
  // console.log(virusTotalResult);

  displayVtResponse(virusTotalResult());

  form.reset();
};

// console.log(virusTotalResult);

const form = document.querySelector(".form");
form.addEventListener("submit", handleSubmit);

const feedbackSection = document.querySelector(".feedback");

const displayVtResponse = (dataParam) => {
  const card = document.createElement("article");
  card.classList.add("feedback__card");

  const ImgContainer = document.createElement("div");
  ImgContainer.classList.add("feedback__img");
  card.appendChild(ImgContainer);

  const feedbackContainer = document.createElement("div");
  feedbackContainer.classList.add("feedback__container");
  card.appendChild(feedbackContainer);

  const testHeading = document.createElement("h2");
  testHeading.classList.add("feedback__title");
  testHeading.innerText = "Scan Result:";
  feedbackContainer.appendChild(testHeading);

  const scanResult = document.createElement("h2");
  scanResult.classList.add("feedback__result");
  scanResult.innerText = dataParam;
  feedbackContainer.appendChild(scanResult);

  console.log(dataParam);

  const resultImg = function checkResult() {
    if (scanResult.innerText === "clean site") {
      ImgContainer.classList.toggle("feedback__img--good");
    } else {
      ImgContainer.classList.toggle("feedback__img--bad");
    }
  };

  resultImg();

  feedbackSection.appendChild(card);
};
