document.getElementById("submitLongURL1").onclick = () => {
  const data = {
    longURL: document.getElementById("longURL1").value,
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
      document.getElementById("short1").innerText = data.shortURL;
    });
};

document.getElementById("submitLongURL2").onclick = () => {
  const data = {
    longURL: document.getElementById("longURL2").value,
  };
  fetch("/api/v2/data/shortenURL2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("short2").innerText = data.shortURL;
    });
};

document.getElementById("submitLongURL3").onclick = () => {
  const data = {
    longURL: document.getElementById("longURL3").value,
  };
  fetch("/api/v3/data/shortenURL3", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("short3").innerText = data.shortURL;
    });
};

document.getElementById("copy1").onclick = () => {
  navigator.clipboard.writeText(document.getElementById("short1").innerText);
  navigator.clipboard.readText();
};

document.getElementById("copy2").onclick = () => {
  navigator.clipboard.writeText(document.getElementById("short2").innerText);
  navigator.clipboard.readText();
};

document.getElementById("copy3").onclick = () => {
  navigator.clipboard.writeText(document.getElementById("short3").innerText);
  navigator.clipboard.readText();
};
