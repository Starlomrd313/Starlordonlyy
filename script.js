
const texts = [
  "HEY SUMERAHHH",
  "CHAL YAAR AB MAAN BHI JA 🙂",
  "Okay fine… meri galti 🤝",
  "Last chance 😄"
];

const backgrounds = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308"
];

let i = 0;

const textEl = document.getElementById("text");
const btn = document.getElementById("btn");
const sound = document.getElementById("clickSound");

// initial background
document.body.style.backgroundImage = `url(${backgrounds[0]})`;

btn.addEventListener("click", () => {
  // sound play
  sound.currentTime = 0;
  sound.play().catch(()=>{});

  i++;

  if (i < texts.length) {
    textEl.innerText = texts[i];
    document.body.style.backgroundImage = `url(${backgrounds[i]})`;
  }

  if (i === texts.length) {
    textEl.innerHTML = `<div class="heart">❤️</div><br>Hope this made you smile 🙂`;
    document.body.style.background = "#111";
    btn.style.display = "none";
  }
});
