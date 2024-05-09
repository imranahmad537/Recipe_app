
let result = document.getElementById("result");
let srchBtn = document.getElementById("srch-btn");


// Example usage:
let searchTerm = "cake"; // Change this to your desired search term


const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
srchBtn.addEventListener('click',() =>{
    let user_inp =  document.getElementById("user-inp").value;
    if(user_inp.length == 0){
        result.innerHTML = `<h3>Input field is empty</h3>`
    }
    else{
    fetch(apiUrl + user_inp)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log("Data from TheMealDB API:", data);
      // Now you can use the data as needed
      let mymeal = data.meals[0];
      console.log("at zero index",mymeal);


      let count = 1;
      let ingredients = [];
      for (let i in mymeal){
        let ingredient = [];
        let measure = "";
        if(i.startsWith("strIngredient") && mymeal[i]){
            ingredient = mymeal[i];
            measure = mymeal[`strMeasure` + count];
            count += 1;
            //console.log(ingredient,measure)
            ingredients.push(`${measure} ${ingredient}`);
        }
      }
      console.log(ingredients);
      result.innerHTML = `
      <img src =${mymeal.strMealThumb}>
      <div class = "details">
      <h2>${mymeal.strMeal}</h2>
      <h4>${mymeal.strArea}</h4>
      </div>

      <div id = "ingredient-con"></div>
      <div id = "recipe">
      <button id="hide_recipe"> X </button>
      <pre id="instruction"> ${mymeal.strInstructions} </pre>
      </div>
      <button id="show_recipe"> View recipe </button>
      `;
      let ingredient_con = document.getElementById("ingredient-con");
      let parent = document.createElement("ul");
      let recipe = document.getElementById("recipe");
      let hiderecipe = document.getElementById("hide_recipe");
      let showrecipe = document.getElementById("show_recipe");

      ingredients.forEach((i) => {
        let child = document.createElement("li");
        child.innerText = i;
        parent.appendChild(child);
        ingredient_con.appendChild(parent)
      });
      hiderecipe.addEventListener('click', ()=>{
        recipe.style.display = "none"
      })
      showrecipe.addEventListener('click', ()=>{
        recipe.style.display = "block"
      })
    })
    .catch(error => {
        result.innerHTML = `<h3>Invalid input</h3>`
      console.error('There was a problem with the fetch operation:', error);
    });
    
    }
})

  











// const apiKey = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your actual API key
// const ipAddress = '8.8.8.8'; // Example IP address

// const apiUrl = `https://ipinfo.io/${ipAddress}?token=${apiKey}`;

// fetch(apiUrl)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log('IPinfo data:', data);
//     // Now you can use the data as needed
//   })
//   .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
//   });





// fetch(apiUrl + "pizza")
//   .then(response => {
//     // Check if the request was successful
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     // Parse the response as JSON
//     return response.json();
//   })
//   .then(data => {
//     // Data is the JSON object returned by the API
//     console.log(data);
//     // Now you can use the data as needed
//   })
//   .catch(error => {
//     // Handle errors
//     console.error('There was a problem with the fetch operation:', error);
//   });