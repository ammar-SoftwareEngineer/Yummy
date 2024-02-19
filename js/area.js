// get Api Area
async function getArea() {
  let getAreaApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let responsArea = await getAreaApi.json();
  let meals = responsArea.meals;
  console.log(meals);
  getCardSearch(meals);
}
getArea();

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
// get Api Card Area
function getCardSearch(meals) {
  let col = ``;
  for (let i = 0; i < meals.length; i++) {
    col += `
                    <div class="col-lg-4 col-md-6">
                        <div class="card rounded-3 bg-opacity-25 text-center" onclick="getDetails(${meals[i].idMeal})">
                        <div class="card-body  rounded-3">
                        <i class="fa-solid fa-location-dot fa-2xl"></i>
                        <p class="card-text  fs-4 fw-semibold">${meals[i].strArea}</p>
                        </div>
                        </div>
                </div> 
      `;
  }
  $("#rowArea").html(col);
}

// $(document).ready(function () {
//   setTimeout(function () {
//     $(".loader").hide();
//   }, 3000);
// });
// $(".loader").onload(function () {
//   $(".loader").show();
// });
