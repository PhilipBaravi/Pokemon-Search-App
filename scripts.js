const pokemonDetails = document.getElementById("pokemon-details");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonImg = document.getElementById("sprite");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

searchButton.addEventListener("click", async () => {
  try {
    let typesSpan = document.querySelectorAll(".type");
    if (typesSpan) {
      typesSpan.forEach((el) => el.remove());
    }

    const query = searchInput.value.trim().toLowerCase();
    if (query === "") {
      alert("Type in a Pokémon Name or ID!");
      return;
    }

    searchButton.disabled = true;

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

    if (!response.ok) {
      throw new Error("Pokémon not found");
    }

    const pokemonData = await response.json();

    pokemonDetails.style.display = "block";

    pokemonName.textContent = pokemonData.name;
    pokemonId.textContent = pokemonData.id;

    pokemonImg.src = pokemonData.sprites.front_default;
    pokemonImg.alt = pokemonData.name;
    pokemonImg.style.display = "block";
    pokemonImg.style.margin = "0 auto";

    weight.textContent = pokemonData.weight;
    height.textContent = pokemonData.height;

    pokemonData.types.forEach((el) => {
      let span = document.createElement("span");
      span.textContent = el.type.name.toUpperCase();
      span.classList.add("type");
      types.appendChild(span);
    });

    hp.textContent = pokemonData.stats[0].base_stat;
    attack.textContent = pokemonData.stats[1].base_stat;
    defense.textContent = pokemonData.stats[2].base_stat;
    specialAttack.textContent = pokemonData.stats[3].base_stat;
    specialDefense.textContent = pokemonData.stats[4].base_stat;
    speed.textContent = pokemonData.stats[5].base_stat;
  } catch (err) {
    alert(err.message || "Failed to fetch Pokémon data");
  } finally {
    searchButton.disabled = false;
  }
});
