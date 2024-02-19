function toggler() {
  $(".toggler-btn").click(function () {
    if ($(".home").css("margin-left") === "0px") {
      $(".home").animate({ "margin-left": -260 }, 350);
      $(".toggler-btn").html(
        '<i class="fa-solid fa-bars fs-2 text-black"></i>'
      );
      $(".lists .navbar-nav-one li").animate({ top: 300 }, 500);
    } else {
      $(".home").animate({ "margin-left": 0 }, 350);
      $(".toggler-btn").html(
        '<i class="fa-solid fa-xmark fs-2 text-black"></i>'
      );
      for (let i = 0; i < 6; i++) {
        $(".lists .navbar-nav-one li")
          .eq(i)
          .animate({ top: 0 }, (i + 1) * 100);
      }
    }
  });
}
toggler();

// Dark Mode And Light Mode
let btnTheme = document.querySelector(".nav-link-theme");

function setLight() {
  document.body.classList.add("light");
  localStorage.setItem("lightMode", "enabled");
}

function disableLight() {
  document.body.classList.remove("light");
  localStorage.setItem("lightMode", "disabled");
}

function toggleLightMode() {
  if (localStorage.getItem("lightMode") === "enabled") {
    disableLight();
    btnTheme.innerHTML = `<i class="fa-solid fa-sun fs-4 text-dark"></i>`;
  } else {
    setLight();
    btnTheme.innerHTML = `<i class="fa-solid fa-moon fs-4 text-dark"></i>`;
  }
}

window.onload = function () {
  if (localStorage.getItem("lightMode") === "enabled") {
    setLight();
    btnTheme.innerHTML = `<i class="fa-solid fa-moon fs-4 text-dark"></i>`;
  }
};

btnTheme.addEventListener("click", toggleLightMode);

// get Api Search
async function getHomeApi() {
  let getApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=A`
  );
  let respons = await getApi.json();
  let meals = respons.meals;

  getCardHome(meals);
}
getHomeApi();
// get Api Details
async function getDetails(d) {
  let getDetailsApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${d}`
  );
  let responsDetails = await getDetailsApi.json();
  let meals = responsDetails.meals;
  getCardHome(meals);
  displayDetails(meals);
}
getDetails();
function getCardHome(meals) {
  let col = ``;
  for (let i = 0; i < meals.length; i++) {
    col += `
                <div class="col-lg-3 col-md-6">
                    <div class="card rounded-3" onclick="getDetails(${meals[i].idMeal})">
                    <img src="${meals[i].strMealThumb}" class="card-img-top w-100 " alt="...">
                    <div class="card-body rounded-3">
                    <p class="card-text fs-5 text-center fw-semibold">${meals[i].strMeal}</p>
                    </div>
                    </div>
            </div> 
  `;
  }
  $("#rowHome").html(col);
}

// get Api Display Details
function displayDetails(meals) {
  $(".body-card").hide();
  $(".body-content").fadeToggle(1000);
  let col = ``;
  let ingredients = ``;
  let tagStr = ``;
  for (let i = 0; i < meals.length; i++) {
    for (let j = 1; j <= 20; j++) {
      if (meals[i][`strIngredient${j}`] && meals[i][`strMeasure${j}`]) {
        ingredients += `<span class="bg-info-subtle p-3 rounded-3 text-center text-black">${
          meals[i][`strMeasure${j}`]
        } - ${meals[i][`strIngredient${j}`]}</span>`;
      }
    }
    let tags = meals[i].strTags?.split(",");
    if (!tags) tags = [];
    for (let k = 0; k < tags.length; k++) {
      console.log(tags[k]);
      tagStr += `<span class="bg-danger-subtle p-2 me-3 rounded-3 text-center text-black">${tags[k]}</span>`;
    }
    col += `<div class="col-lg-6">
          <div class="card w-100">
            <img src="${meals[i].strMealThumb}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
              <p class="card-text">${meals[i].strMeal}</p>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
    <div class="details-food">
        <h2>Instructions</h2>
        <p class="info-food">${meals[i].strInstructions}</p>
        <div class="info">
            <p class="area fw-bold fs-4">
                Area : <span class="fw-medium">${meals[i].strArea}</span>
            </p>
            <p class="category fw-bold fs-4">
                Category : <span class="fw-medium">${meals[i].strCategory}</span>
            </p>
        </div>
        <div class="recipe mb-4">
            <h3 class="mb-4">Recipes:</h3>
            <div class="amount d-flex flex-wrap gap-3 overflow-auto">
                ${ingredients}
            </div>
        </div>
        <div class="tags mb-5">
            <h3 class="mb-4">Tags :</h2>
                <div class="tag">

                    ${tagStr}
                </div>
        </div>
        <div class="buttons">
            <a href="${meals[i].strSource}" target="_blank" class="btn btn-success">Source</a>
            <a href="${meals[i].strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
        </div>
    </div>
  </div>`;
  }
  $("#rowDetails").html(col);
}

// loader
$(document).ready(function () {
  setTimeout(function () {
    $(".loader").hide();
  }, 3000);
});
