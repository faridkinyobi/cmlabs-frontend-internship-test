$(document).ready(function () {
  $("#menu-toggle").click(function () {
    if (!$("#nav-block").hasClass("top-20 md:top-0")) {
      $("#nav-block").addClass("top-20 md:top-0");
      $("#toggle-hidden").addClass("hidden");
      $("#toggle-top").addClass("rotate-45");
      $("#toggle-button").addClass("-rotate-45 absolute bottom-0 right-0");
    } else {
      $("#nav-block").removeClass("top-20 md:top-0"); // Menghapus kelas jika sudah ada
      $("#toggle-hidden").removeClass("hidden");
      $("#toggle-top").removeClass("rotate-45");
      $("#toggle-button").removeClass("-rotate-45 absolute bottom-0 right-0");
    }
  });
});

// fetch list kategori
$(document).ready(function () {
  axios
    .get("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(function (response) {
      const resData = response.data.categories;
      let data = "";
      $.each(resData, function (_, item) {
        data += `
         <div class="btn-select cursor-pointer relative bg-neutral-300 max-w-60 max-h-32 rounded-xl overflow-hidden before:content-[''] before:absolute before:inset-0 before:h-full before:w-full before:bg-zinc-900 before:opacity-20 before:rounded-xl ">
            <img class="w-full h-full object-cover" src=${item.strCategoryThumb} alt=""/>
            <h2  class="absolute  inset-0 flex items-center justify-center text-neutral-50 font-bold text-lg md:text-xl">
            ${item.strCategory}
            </h2>  
            </div>
        `;
      });
      $("#result").html(data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// redirect halaman
$(document).ready(function () {
  $("#result").on("click", ".btn-select", function () {
    const category = $(this).find("h2").text().trim();
    window.location.href = `CategoryDetail.html?category=${category}&type=Foods`;
  });
});

// get Category-name
$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  axios
    .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((res) => {
      // console.log(res.data.meals);
      const resultMeals = res.data.meals;
      let data = "";
      $.each(resultMeals, function (_, item) {
        data += `
          <div data-id="${item.idMeal}" class="btnSelectMeal cursor-pointer relative bg-neutral-300 max-w-60 max-h-32 rounded-xl overflow-hidden before:content-[''] before:absolute before:inset-0 before:h-full before:w-full before:bg-zinc-900  before:opacity-20 before:rounded-xl">
              <img class="w-full h-full object-cover" src=${item.strMealThumb} alt="" />
             <h2  class="absolute inset-0 flex items-center justify-center text-neutral-50 font-bold text-lg md:text-xl text-center">
              ${item.strMeal}
               </h2>  
          </div>
          `;
      });
      $("#resByCategory").html(data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// url params saat ini
$(document).ready(function () {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);

  const params = new URLSearchParams(url.search);
  const category = params.get("category");
  const type = params.get("type");
  $("#TitelCatagory").html(category);
  $("#breadcrumb-url").html(type);
});

// redirect to Meal detail
$(document).ready(function () {
  $("#resByCategory").on("click", ".btnSelectMeal", function () {
    const idMeal = $(this).data("id");
    console.log("ID Meal:", idMeal);
    window.location.href = `MealDetail.html?DetailMeal=${idMeal}`;
  });
});
