async function getCategoryApi() {
  let getApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let response = await getApi.json();
  let categories = response.categories;
  console.log(categories);
  dataCategories(categories);
}
getCategoryApi();

async function getDetails(d) {
  let getDetailsApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${d}`
  );
  let responseDetails = await getDetailsApi.json();
  let mealsD = responseDetails.meals;
  displayDetails(mealsD);
}
getDetails();
async function getDetailsCategory(c) {
  let getDetailsApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${c}`
  );

  let responsDetails = await getDetailsApi.json();
  let mealsCategory = responsDetails.meals;
  console.log(mealsCategory);

  displayDetailsCategory(mealsCategory);
}

function displayDetailsCategory(arr) {
  $(".body-content-category").hide();
  $(".body-card").fadeToggle(1000);
  let col = ``;
  for (let i = 0; i < arr.length; i++) {
    col += `
    <div class="col-lg-3">
        <div class="card rounded-3" onclick="getDetails(${arr[i].idMeal})">
        <img src="${arr[i].strMealThumb}" class="card-img-top img-fluid rounded-3" alt="...">
        <div class="card-body rounded-3 pb-5">
        <p class="card-text fs-5 fw-medium">${arr[i].strMeal}</p>
        </div>
        </div>
</div> 
`;
  }
  $("#rowDetailsCategory").html(col);
}
function dataCategories(categories) {
  let col=``;
  let nameCategory;
  for (let i = 0; i < categories.length; i++) {
    nameCategory = categories[i].strCategory ;
    col += ` 
        <div class="col-lg-4 col-md-6">
        <div class="card rounded-3" onclick=" getDetailsCategory('${nameCategory}')" >
        <img src="${
          categories[i].strCategoryThumb
        }" class="card-img-top  rounded-3" alt="...">
        <div class="card-body rounded-3 text-center overflow-hidden d-grid">
        <h3 class="card-head fs-4 fw-semibold">${categories[i].strCategory}</h3>
        <p class="card-text fs-5 fw-semibold">${categories[
          i
        ].strCategoryDescription.slice(0, 100)}</p>
        </div>
        </div>
        </div>`;
    $("#rowCategory").html(col);
  }
}


// loader
$(document).ready(function () {
  setTimeout(function () {
    $(".loader").hide();
  }, 3000);
});
$(".loader").onload(function () {
  $(".loader").show();
});
