document.getElementById("submitLongURL").onclick = () => {
  const data = {
    longURL: document.getElementById("longURL").value,
  };
  fetch("/api/v1/data/shortenURL1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
        document.getElementById("short").innerText = data.shortURL;
    });
};
