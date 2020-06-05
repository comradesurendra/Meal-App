const search=document.getElementById("search");
const submit=document.getElementById("submit");
const random=document.getElementById("random");
const mealsEl=document.getElementById("meals");
const resultHeading=document.getElementById("result-heading");
const single_mealEl=document.getElementById("single-meal");

//search meal function
function searchMeal(e){
    e.preventDefault()

    //clear screen
    single_mealEl.innerHTML="";

    //what user search here we will get
    const term=search.value;

    //check for empty
    if(term.trim()){
        //some code is alredy present in backend,then whatever you type there in the (db) they will fetch & return you.
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(response=>response.json())//then this data will represnt in json so we can read this,but this can also fail,you again use one .then
        .then(data=>{
            console.log("data is",data);
            resultHeading.innerHTML=`<h2>Search result for '${term}':</h2>`

            if(data.meals==null){ // if user enter wronginput,meals is array (data.meals)
                resultHeading.innerHTML=`<p>There are no search results.Try Again</p>`
            }
            else{//data-mealID == id 
                const mealss=data.meals[0];
                    addMealToDom(mealss)
                }
            
        })
        .catch(error=>console.log("error occured",error));
        search.value="";
    }
    else{
        alert("please enter a receipe name");
    }

}


//random meal function
function getRandomMeal(){
     mealsEl.innerHTML="";
     resultHeading.innerHTML="";
     fetch('https://www.themealdb.com/api/json/v1/1/random.php')
     .then(res=>res.json())
     .then(data=>{
         const meal= data.meals[0];
         addMealToDom(meal);
         console.log(data);
     })
     .catch(error=>console.log(error));
}

function addMealToDom(meal){
  const ingredients=[];//in backend we add 20 meals for every order.
  for(let i=1;i<=20;i++){
     if(meal[`strIngredient${i}`]){//those are not empty,i'm putting that value.
         ingredients.push(`${meal[`strIngredient${i}`]}`)
     }
     else{
         break;
     }
  }

single_mealEl.innerHTML=`
<div class="single-meal">
<h1>${meal.strMeal}</h1>
<img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
<div class="single-meal-info">
${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
</div>
<div class="main">
<p>${meal.strInstructions}</p>
<h2>Ingredients</h2>
<ul>
${ingredients.map(ing => `<li>${ing}</li>`).join('')}
</ul>
</div>
</div>
`;
}

submit.addEventListener("submit",searchMeal); // click for search
random.addEventListener("click",getRandomMeal); //click for after search(random)

