let input = document.querySelector('input')

input.addEventListener('keyup', e => {
    if(e.key === 'Enter'){
        input = document.querySelector('input').value.split(' ').join('_')
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`
  console.log(url)
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
           clear()
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
})

function clear(){
    const main = document.querySelector('.container')
    while(main.firstChild){
        main.removeChild(main.firstChild)
    }
}

function getInfo(drink){
    const section = document.createElement('section');
    section.innerHTML = `
    <h2>${drink.strDrink}</h2>
    <img src="${drink.strDrinkThumb}"></img>
    <h3>Ingredients</h3>
    <span>${getIngredient(drink)}</span>
    <h3>Instructions</h3>
    <p>${drink.strInstructions}</p>
    `
    document.querySelector('.container').appendChild(section)
}   

function getIngredient(drink){
    let ingredients = []
             for(let i = 1; i < 15; i++){
                let ingredientNum = `strIngredient${i}`
                let ingredient = drink[ingredientNum]
                if(ingredient === null) break
                ingredients.push(ingredient)
             }
              return ingredients.join(', ')
}



