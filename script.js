const messages = [
  "Hey Sumera...",
  "Thoda over ho gaya tha 😅",
  "But ignore karna itna bhi zaroori tha kya?",
  "Chal maan liya meri galti 🤝",
  "Ab maan bhi ja 🙂",
  "Normal ho jaye?"
];

let index = 0;

function next() {
  document.getElementById("music").play();

  index++;
  if(index < messages.length){
    document.getElementById("text").innerText = messages[index];
  }

  if(index === messages.length - 1){
    setTimeout(() => {
      const yes = document.createElement("button");
      yes.innerText = "Theek hai 🙂";
      yes.onclick = () => {
        document.getElementById("text").innerText = "Good 😄";
      };

      const no = document.createElement("button");
      no.innerText = "Nahi 😒";
      no.onclick = () => {
        alert("Fir try kar 😄");
      };

      document.querySelector(".container").appendChild(yes);
      document.querySelector(".container").appendChild(no);
    }, 500);
  }
}
