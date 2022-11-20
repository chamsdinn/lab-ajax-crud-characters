const character = ("db.json")
const charactersAPI = new APIHandler("http://localhost:8000");
const editForm = document.getElementById("edit-character-form");
const listCharacters = document.querySelector(".characters-container");
const characterInfo = document.querySelector(".character-info");
window.addEventListener("load", () => {
  document
    .getElementById("fetch-all")
    .addEventListener("click", async function (event) {
      const { data } = await axios.get("http://localhost:8000/characters");
      listCharacters.innerHTML = "";
      data.forEach((character) => {
        const div = characterInfo.cloneNode(true);
        div.querySelector(".name").textContent = character.name;
        div.querySelector(".occupation").textContent = character.occupation;
        div.querySelector(".cartoon").textContent = character.cartoon;
        div.querySelector(".weapon").textContent = character.weapon;
        // const div = document.createElement("div")
        // div.className = "character-info"
        // div.innerHTML = `<div class="name"> ${character.name}</div> <div class="occupation"> ${character.occupation}</div>
        // <div class="cartoon"> ${character.cartoon}</div> <div class="weapon"> ${character.weapon}</div> `
        listCharacters.append(div);
      });
    });

  document
    .getElementById("fetch-one")
    .addEventListener("click", async function (event) {
      const id = document.querySelector('input[name="character-id"]').value;
      const { data } = await axios.get(
        `http://localhost:8000/characters/${id}`
      );
      // data.getElementById(id)
      const div = characterInfo.cloneNode(true);
      div.querySelector(".name").textContent = data.name;
      div.querySelector(".occupation").textContent = data.occupation;
      div.querySelector(".cartoon").textContent = data.cartoon;
      div.querySelector(".weapon").textContent = data.weapon;
      listCharacters.append(div);
    });

  document
    .getElementById("delete-one")
    .addEventListener("click", async function (event) {
      const id = document.querySelector(
        'input[name="character-id-delete"]'
      ).value;
      const { data } = await axios.delete(
        `http://localhost:8000/characters/${id}`
      );
      if (data.id === null) {
        document.getElementById("delete-on").style.color = "green";
      } else {
        document.getElementById("delete-on").style.color = "red";
      }
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      console.log("event", event);
      const id = event.target[0].value;
      const name = event.target[1].value;
      const occupation = event.target[2].value;
      const weapon = event.target[3].value;
      const cartoon = event.target[4].value;
      const character = {
        id: "chr-id",
        name: name,
        occupation: occupation,
        weapon: weapon,
        cartoon: cartoon,
      };
      const url = `http://localhost:8000/characters/${id}`;
      try {
        const { data } = await axios.patch(url, character);
        await axios({
          method: "PATCH",
        });
        if(data===character){
          document.getElementById("send-data").style.color = "green";
        }else{
          document.getElementById("send-data").style.color = "red";
        }
        console.log("data", data);
      } catch (error) {
        console.log(error);
      }
    });

  document
    .getElementById("new-character-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const name = document.querySelector("input[name='name']").value;
      const occupation = document.querySelector("input[name='occupation']").value;
      const weapon = document.querySelector("input[name='weapon']").value;
      const cartoon = document.querySelector("input[name='cartoon']").value;
      const character = { name, occupation, weapon, cartoon };

      const newCharacter = await axios.post(
        "http://localhost:8000/characters",
        character
      );
      if(newCharacter){
        document.getElementById("send-data").style.color = "green";
      }else{
        document.getElementById("send-data").style.color = "red";
      }
      console.log(newCharacter);
    });
});
