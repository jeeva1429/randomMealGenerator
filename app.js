const inputs = document.querySelector("input");
inputs.addEventListener("blur", (el) => {
  if (el.target.value) {
    el.target.classList.add("value-entered");
  } else {
    el.target.classList.remove("value-entered");
  }
});

// Generating the random meal section

// Storing the url in a variable
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

// Creating necessary varibles
const randomMealName = document.getElementById("random-meal-name");
const randomMealImage = document.getElementById("random-meal-image");

// Creating a function to randomly generate meals
const randomMealGenerator = async () => {
  fetch(randomMealUrl)
    .then((re) => re.json())
    .then((el) => {
      el.meals.forEach((food) => {
        randomMealImageApender(food);
        randomMealNameApender(food);
        randomMealIngredientLoader(food);
        // console.log(food)
      });
    });
};
var ingredentContainer = document.getElementById("ingredients");
var randomMealImageApender = (food) =>
  (randomMealImage.src = food.strMealThumb);
var randomMealNameApender = (food) =>
  (randomMealName.textContent = food.strMeal);
var randomMealIngredientLoader = (food) => {
  const ingredientArray = [];
  var count = 1;
  while (true) {
    if (food[`strIngredient${count}`] != "") {
      ingredientArray.push(food[`strIngredient${count}`]);
      count++;
    } else {
      break;
    }
  }
  console.log(ingredientArray);
  ingredentContainer.innerHTML = "";
  ingredientArray.forEach((el) => {
    var ele = document.createElement("li");
    ele.textContent = el;
    ingredentContainer.appendChild(ele);
  });
};

// On reloading the page, calling the function
window.onload = () => randomMealGenerator();

// onclicking the btn to randomly generate a meal
var getMealButton = document.getElementById("random-meal-btn");
getMealButton.onclick = () => {
  randomMealGenerator();
};
// Function to open the ingredient box.
var ingredientBox = document.querySelector("#random-meal-ingredients");
var getIngredientBtn = document.querySelector("#random-meal-ingredients-btn");
function toggleModal() {
  ingredientBox.style.cssText = "opacity:1; z-index:2";
  // document.body.style.cssText = 'opacity:0.5'
}
getIngredientBtn.addEventListener("click", toggleModal);

// Funtion to close the ingredent box
var closeIngredient = document.getElementById("close-ingredient");
var closeModal = () => (ingredientBox.style.cssText = "opacity:0");
closeIngredient.onclick = () => {
  closeModal();
};

// Fetching api to get the categories

const categoriesUrl = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
var categoryDiv = document.getElementsByClassName("category-div")[0];
var areaUrl = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
var areaDiv = document.getElementsByClassName("area-div")[0];
var categoryArray = [];
const getCategories = async (url, container) => {
  fetch(url)
    .then((res) => res.json())
    .then((category) => {
      container.innerHTML = "";
      category.meals.forEach((ele) => {
        categoryArray.push(ele);
        var categroyLi = document.createElement("li");
        container.append(categroyLi);
        categroyLi.textContent = ele[Object.keys(ele)];
        // console.log(ele);
        // return categoryArray
      });
    });
};

const categoryEle = document.getElementById("category");
const areaEle = document.getElementById("area");
categoryEle.onclick = () => {
  if (categoryDiv.classList.contains("nav-bar-ele-active")) {
    categoryDiv.classList.remove("nav-bar-ele-active");
  } else {
    categoryDiv.classList.add("nav-bar-ele-active");
    getCategories(categoriesUrl, categoryDiv);
  }
};

areaEle.onclick = () => {
  if (areaDiv.classList.contains("nav-bar-ele-active")) {
    areaDiv.classList.remove("nav-bar-ele-active");
  } else {
    areaDiv.classList.add("nav-bar-ele-active");
    getCategories(areaUrl, areaDiv);
  }
};

// fucntion to fetch and show the searhed results

var areabtn = document.getElementById('area-btn')
var categorybtn = document.getElementById('category-btn')

let keyword = inputBox.value
var mode = ""
areabtn.onclick = () => {
  mode = 'area'
  console.log(mode)

}

// categorybtn.onclick = () => console.log('jo')

categorybtn.onclick =() => {
  mode = 'category'
  console.log(mode)
 
}

function showSearched(){
  if (mode == 'area') {
    var inputBox = document.getElementById("inputBox");
    let input = inputBox.value
    var searchByArea = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${input}`
    var newUrl = searchByArea
    console.log(searchByArea)
    fetch(newUrl).then(res => res.json()).then(
      e =>{
        console.log(e)
        e.meals.forEach(food => {
          console.log(food)
          var img = document.createElement('img')
          img.src = food.strMealThumb
          var p = document.createElement('p')
          p.textContent = food.strMeal
          searchedMealdiv.append(img, p)
          console.log(food.strMeal)
        })

      }
      )
  }
  else if (mode == 'category') {
    var inputBox = document.getElementById("inputBox");
    let input = inputBox.value
    var searchByCategroy = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${input}`
    var newUrl = searchByCategroy
    fetch(newUrl).then(res => res.json()).then(e =>  {console.log(e)
      e.meals.forEach(food => {
        console.log(food)
        var img = document.createElement('img')
        img.src = food.strMealThumb
        var p = document.createElement('p')
        p.textContent = food.strMeal
        searchedMealdiv.append(img, p)
        console.log(food.strMeal)
      })})
  }
}
var searchedMealdiv = document.getElementById('searched-Meals')
if (searchedMealdiv.classList.contains("searchedMeal-active")) {
    searchedMealdiv.classList.remove("searchedMeal-active");
  } else {
    searchedMealdiv.classList.add("searchedMeal-active");
  }


document.addEventListener('keyup', (e) => {
    e.key == 'Enter'? showSearched():null
})
