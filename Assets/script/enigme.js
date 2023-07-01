
const overlay = document.querySelector(".overlay");

// formulaire et popup
const btnConfirm = document.getElementById("btnConfirm");
const btnPopupQuiz = document.getElementById("btn-popup");
const textReponse = document.getElementById("reponse");
const popupTitre = document.querySelector(".popup-titre");
const popupText = document.querySelector(".popup-text");


const validator = document.querySelector(".validator");


const compteurQuiz = document.querySelector(".compteur");


const paraSujet = document.getElementsByClassName("para");
const aside = document.querySelector(".aside-element");


const asideTitre = document.createElement("h3");
aside.appendChild(asideTitre);
const asidePara = document.createElement("p");
aside.appendChild(asidePara);

// recolte des données dans enigme json
const urlEnigme = "../Assets/Json/enigme.json";
fetch(urlEnigme)
  .then((reponse) => reponse.json())
  .then((dataEnigme) => populate(dataEnigme))
  .catch((err) => {
    console.err(err);
  });

let i = 0;
compteurQuiz.textContent = i + 1;

function populate(dataEnigme) {
  function afficheTrue() {
    popupTitre.textContent = `BRAVO!!`;
    popupText.textContent = `Tu as trouvé la réponse.Es tu prêt pour l'énigme suivante ?`;
    textReponse.value = "";
    overlay.style.display = "block";
    btnPopupQuiz.addEventListener("click", function () {
      overlay.style.display = "none";
    });
  }

  function afficheFalse() {
    popupTitre.textContent = `OUPS!!!`;
    popupText.textContent = `Vous pouvez encore reessayer`;
    btnPopupQuiz.textContent = `REESAYER`;
    textReponse.value = "";
    overlay.style.display = "block";
    btnPopupQuiz.addEventListener("click", function () {
      overlay.style.display = "none";
    });
  }
  
  btnConfirm.addEventListener("click", function (evt) {
    evt.preventDefault();
    if (textReponse.value === "") {
      validator.textContent = "Veuillez entrer votre réponse";
    } else {
      while (i < dataEnigme.length) {
        validator.textContent = "";
        //   transformation des reponses en miniscule
        const givenReponse = textReponse.value.toLocaleLowerCase();
        const reponseData = dataEnigme[i].reponse.toLocaleLowerCase();

        if (i === 0) {
          if (givenReponse === reponseData) {
            afficheTrue();
            i++;
            // effacer les initialisations sur html
            document.querySelector(".transcrip-aside").remove();
            document.querySelector(".quote").remove();
            // partie intro et sujet de enigme
            paraSujet[0].textContent = dataEnigme[i].intro;
            paraSujet[1].textContent = dataEnigme[i].sujet;
            // partie aside

            asideTitre.textContent = `Le savais tu ? `;
            asidePara.textContent = dataEnigme[i].plus;
            compteurQuiz.textContent = i + 1;

            // console.log(i);
          } else {
            afficheFalse();
            // console.log(i);
          }
        } else if (i === dataEnigme.length - 1) {
          if (givenReponse === reponseData) {
            popupTitre.textContent = `TON INITIATION EST TERMINE`;
            popupText.textContent = ``;
            btnPopupQuiz.textContent = `REVENIR A L'ECRAN D'ACCUEIL`;
            textReponse.value = "";

            // Les dates
            const dateFuture = new Date("2023-06-30 23:59:59").getTime();

            //  les references sur html
            const imgFigma = document.querySelector(".figma img");
            const minuterText = document.querySelector(".minuter");

            imgFigma.src = "../Assets/Images/Illustration + Logo/Page_Enigme/figma_logo.svg";

            let compteurRebours = setInterval(() => {
              let dateNow = new Date().getTime();
              let difference = dateFuture - dateNow;
              // les variables jours / heures / minutes / secondes
              let j = Math.floor(difference / (1000 * 60 * 60 * 24));
              let h = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
              );
              let min = Math.floor(
                (difference % (1000 * 60 * 60)) / (1000 * 60)
              );
              let sec = Math.floor((difference % (1000 * 60)) / 1000);
              //
              j = j < 10 ? "0" + j : j;
              h = h < 10 ? "0" + h : h;
              min = min < 10 ? "0" + min : min;
              sec = sec < 10 ? "0" + sec : sec;
              minuterText.innerHTML = `COMMING SOON... <br><span>${j} : ${h} : ${min} : ${sec}</span>`;

              if (difference < 0) {
                clearInterval(compteurRebours);
                minuterText.innerHTML = `C'est l'heure!!`;
              }
            }, 1000);
            // -----------------FIN ---------------

            overlay.style.display = "block";
            btnPopupQuiz.addEventListener("click", function () {
              overlay.style.display = "none";
              window.location.href = "../index.html";
            });
            i++;
            // console.log(i);
          } else {
            afficheFalse();
            // console.log(i);
          }
        } else {
          if (givenReponse === reponseData) {
            afficheTrue();
            i++;
            paraSujet[0].textContent = dataEnigme[i].intro;
            paraSujet[1].textContent = dataEnigme[i].sujet;
            asideTitre.textContent = `Le savais tu ? `;
            asidePara.textContent = dataEnigme[i].plus;
            compteurQuiz.textContent = i + 1;
            // console.log(i);
          } else {
            afficheFalse();
            // console.log(i);
          }
        }

        break;
      }
    }
  });
}