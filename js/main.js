let input = document.querySelector('input')
document.addEventListener('DOMContentLoaded', cocktail)
input.addEventListener('keyup', e => {
    if(e.key === 'Enter'){
        cocktail()
    }
})

function cocktail(){
    input = document.querySelector('input').value.split(' ').join('_')
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`
  console.log(url)
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            clear()
        reinitSwiper(swiper)
            data.drinks.forEach((drink) => {
                console.log(drink)
                getInfo(drink) 
                getIngredient(drink)
            })  
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}

function clear(){
    const swiperWrapper = document.querySelector('.swiper-wrapper')
    while(swiperWrapper.firstChild){
        swiperWrapper.removeChild(swiperWrapper.firstChild)
    }
} 

function getInfo(drink){
    const div = document.createElement('div');
    div.classList.add('swiper-slide')
    div.classList.add('card')
    div.innerHTML = `
    <div class="cardInfo">
        <div class="left">
        <div class="drinkTitle">
            <h2>${drink.strDrink}</h2>
        </div>
            <div class="image">
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}"></img>
            </div>
            </div>
            <div class="right">
            <div class="ingredients">
                <h3>Ingredients</h3>
                <span>${getIngredient(drink)}</span>
            </div>
            <div class="instructions">
                <h3>Instructions</h3>
                <p>${drink.strInstructions}</p>
            </div>
            </div>
    </div>
        
    `
    document.querySelector('.swiper-wrapper').appendChild(div)
}   

function getIngredient(drink){
    let ingredients = []
             for(let i = 1; i < 15; i++){
                let ingredientNum = `strIngredient${i}`
                let ingredient = drink[ingredientNum]
                if(ingredient === null) break
                if(ingredient === '') break
                ingredients.push(ingredient)
             }
              return ingredients.join(', ')
}

function reinitSwiper(swiper) {
    setTimeout(function () {
     swiper.update();
    }, 500);
  }
