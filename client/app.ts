const formElement = window.document.querySelector("form");

formElement?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(formElement);
  const data = Object.fromEntries(formData.entries());

  document.querySelector("#loading")?.removeAttribute("hidden");
  document.querySelector("#traps")?.setAttribute("hidden", "");

  fetch("/api/traps", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      for (const trapElement of Array.from(
        document.querySelector("#traps")?.children ?? []
      )) {
        trapElement.remove();
      }

      document.querySelector("#traps")?.removeAttribute("hidden");
      document.querySelector("#loading")?.setAttribute("hidden", "");

      if (data.traps?.length) {
        for (const trap of data.traps) {
          const li = document.createElement("li");
          li.textContent = trap;
          document.querySelector("#traps")?.appendChild(li);
        }
      } else {
        const li = document.createElement("li");
        li.textContent = "No traps found.";
        document.querySelector("#traps")?.appendChild(li);
      }
    });
});
