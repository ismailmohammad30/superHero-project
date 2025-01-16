async function get() {
    const response = await fetch(`https://superheroapi.com/api.php/76296b1871cf60f09b2ca23b0b28207a/search/batman`)
    const data = await response.json()
    console.log(data.results)
}
get()
async function getHero(heroName) {
    const response = await fetch(`https://superheroapi.com/api.php/76296b1871cf60f09b2ca23b0b28207a/search/${heroName}`);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
        document.querySelector('#content h1').innerHTML = "<h1>" + data.results[0].name + "</h1>";
        document.querySelector('#content img').src = data.results[0].image.url;
        document.querySelector('#content h5').innerHTML = "<h5> Movies: " + data.results[0].biography.aliases + "</h5>"
        document.querySelector('#content h4').innerHTML = "<h4> publisher: " + data.results[0].biography.publisher + "</h4>"
        document.getElementById('saveButton').onclick = () => saveHero(data.results[0].name, data.results[0].image.url);
    } else {
        document.querySelector('#content h1').innerHTML = "<h1>No results found</h1>";
    }
}
document.getElementById('searchButton').addEventListener('click', () => {
    const heroName = document.getElementById('searchInput').value.trim();
    if (heroName) {
        getHero(heroName);
    } else {
        alert('enter a superhero name');
    }
});

function saveHero(name, imageUrl) {
    const favoriteHeroes = JSON.parse(localStorage.getItem('favoriteHeroes')) || [];

    if (!favoriteHeroes.some(hero => hero.name === name)) {
        favoriteHeroes.push({ name, imageUrl });
        localStorage.setItem('favoriteHeroes', JSON.stringify(favoriteHeroes));
        alert(`${name} has been saved to favorites!`);
    } else {
        alert(`${name} is already in your favorites.`);
    }
}

function displayFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    const favoriteHeroes = JSON.parse(localStorage.getItem('favoriteHeroes')) || [];

    favoritesList.innerHTML = '';

    if (favoriteHeroes.length > 0) {
        favoriteHeroes.forEach(hero => {
            const heroCard = document.createElement('div');
            heroCard.className = 'favorite-card';
            heroCard.innerHTML = `
                <h3>${hero.name}</h3>
                <img src="${hero.imageUrl}" alt="${hero.name}" />
            `;
            favoritesList.appendChild(heroCard);
        });
        document.getElementById('favorites').style.display = 'block';
    } else {
        document.getElementById('favorites').style.display = 'none';
    }
}

window.onload = () => {
    displayFavorites();
};