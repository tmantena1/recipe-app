const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID= 'cb2b4722';
const APP_KEY= '6d92a9b635855459ee2c7af943fdec8e';



searchForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();

}
)

async function fetchAPI(){
    const baseURL = 'https://api.edamam.com/search?q=' + searchQuery + '&app_id='+ APP_ID + '&app_key=' + APP_KEY + '&to=20';
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML(results){
    let generatedHTML = '';
    results.map(results => {
        generatedHTML +=

        `
           <div class="item">
                <img src="${results.recipe.image}" alt="">
                <div class="flex-container">
                    <h1 class="title">${results.recipe.label}</h1>
                    <a class= "view-button" href='${results.recipe.url}'>View Recipe</a>
                </div>
                <p class="item-data">Calories: ${results.recipe.calories.toFixed(2)}</p>
                <p class="item-data">Health Label: ${results.recipe.healthLabels.length > 0 ? results.recipe.healthLabels : 'No Data Found'}</p>

                
            </div>
        `

    })

    searchResultDiv.innerHTML = generatedHTML;
}