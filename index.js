let myDiv = document.getElementById("result");

Quagga.init(
  {
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.getElementById("content"),
      constraints: {
        width: 640,
        height: 480,
        facingMode: "environment",
      },
    },
    locator: {
      patchSize: "medium",
      halfSample: true,
    },
    numOfWorkers: navigator.hardwareConcurrency || 4,
    decoder: {
      readers: [
        "code_128_reader",
        "ean_reader",
        "ean_8_reader",
        "code_39_reader",
        "code_39_vin_reader",
        "codabar_reader",
        "upc_reader",
        "upc_e_reader",
        "i2of5_reader",
        "2of5_reader",
        "code_93_reader",
      ],
    },
    debug: {
      showCanvas: false,
      drawBoundingBox: true,
      showFrequency: false,
      drawScanline: false,
      showPattern: false,
    },
    locate: true,
  },
  function (err) {
    if (err) {
      //   myDiv.innerHTML = "Some error for Quagga" + err;
      console.error(err);
      alert("Error: No barcode detected. Try again");
      myDiv.innerText = "Error: No barcode detected. Try again";
      return;
    }
    Quagga.start();
    // myDiv.innerHTML = "Quagga is started";
  }
);

Quagga.onDetected(function (result) {
  console.log("Barcode detected and processed: ", result.codeResult);

  let userResponse = confirm(
    "Barcode detected: " +
      result.codeResult.code +
      "\nDo you want to continue scanning?"
  );

  if (!userResponse) {
    alert("Scanning ended.");
    Quagga.stop();
  }
  myDiv.innerHTML = "The detected barcode is: " + result.codeResult.code;
});
