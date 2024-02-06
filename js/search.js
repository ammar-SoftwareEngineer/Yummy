let inputSearch = document.querySelector(".search");
let inputSearchLetter = document.querySelector(".search-letter");

// get Api Search
async function getSearchApi(s) {
  let getApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${s}`
  );
  let respons = await getApi.json();
  console.log(respons);
  let meals = respons.meals;
  console.log(meals);
  getCardSearch(meals);
}
getSearchApi();

// get Api Search Letter
async function getSearchLetterApi(l) {
  let getLetterApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`
  );
  let responsLetter = await getLetterApi.json();
  let meals = responsLetter.meals;

  getCardSearch(meals);
}
getSearchLetterApi();

// get Api Details
async function getDetails(d) {
  let getDetailsApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${d}`
  );
  let responsDetails = await getDetailsApi.json();
  let meals = responsDetails.meals;
  getCardSearch(meals);
  displayDetails(meals);
}
getDetails();

// get Api Card Search
function getCardSearch(meals) {
  let col = ``;
  let mealsDetails;

  for (let i = 0; i < meals.length; i++) {
    mealsDetails = meals[i].idMeal;

    col += `
                  <div class="col-lg-3 col-md-6">
                      <div class="card rounded-3" onclick="getDetails(${mealsDetails})">
                      <img src="${meals[i].strMealThumb}" class="card-img-top w-100 rounded-3" alt="...">
                      <div class="card-body rounded-3">
                      <p class="card-text fs-4 fw-semibold">${meals[i].strMeal}</p>
                      </div>
                      </div>
              </div> 
    `;

    $("#row").html(col);
  }
}


inputSearch.addEventListener("keyup", (s) => {
  getSearchApi(s.target.value);
});
inputSearchLetter.addEventListener("keyup", (l) => {
  getSearchLetterApi(l.target.value);
});
$(document).ready(function () {
  setTimeout(function () {
    $(".loader").hide();
  }, 3000);
});
$(".loader").onload(function () {
  $(".loader").show();
});
