const texts = [
  "HEY SUMERAHHH",
  "CHAL YAAR AB MAAN BHI JA 🙂",
  "Seriously… itna bhi gussa theek nahi 😅",
  "Okay fine… meri galti 🤝"
];

const backgrounds = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308"
];

let i = 0;

function next() {
  const text = document.getElementById("text");
  const sound = document.getElementById("clickSound");

  // play sound
  sound.currentTime = 0;
  sound.play();

  i++;

  if (i < texts.length) {
    text.innerText = texts[i];
    document.body.style.backgroundImage = `url(${backgrounds[i]})`;
  }

  // final heart screen
  if (i === texts.length) {
    text.innerHTML = `<div class="heart">❤️</div><br>Hope this made you smile 🙂`;
    document.body.style.background = "#111";
  }
}

// initial background
document.body.style.backgroundImage = `url(${backgrounds[0]})`;
