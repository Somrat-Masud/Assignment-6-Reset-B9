//Load All Data ...
const loadAllData = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayAllData(data.pets))
    .catch((error) => console.log(error));
};
// Load Details Button
const loadDetailsButton = async (petId) => {
  uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetailsButton(data.petData);
};

// Display Details Button
const displayDetailsButton = (petData) => {
  const detailsContainer = document.getElementById("modal-content");
  detailsContainer.innerHTML = `
 <figure class="h-[200px]">
      <img
        src=${petData.image}
        class="h-full w-full object-cover rounded-xl"
        alt="Shoes" />
    </figure>
    <div class="">
      <h1 class="font-extrabold text-xl pt-5 pb-2">${petData.pet_name}</h1>
      <div class="flex space-x-2  items-center>
       <img src="https://img.icons8.com/?size=64&id=0W1W77iQlek5&format=png"/>
         <p>Breed:${petData.breed}</p>
        
      </div>
     <div class="flex space-x-2  items-center ">
      <img class="h-5 w-5 object-cover" src="https://img.icons8.com/?size=48&id=5VOqBjvi7siv&format=png"/>
     <p>Birth:${petData.date_of_birth}</p>
     </div>
     <p>Gender:${petData.gender}</p>
      <p class="pb-4">Price:${petData.price}$</p>
      </div>
    </div>

    <p><span class="text-sm font-bold">Details Information:</span>${petData.pet_details}</p>
      
  `;
  document.getElementById("showModalData").click();
};
//image clicked handler
const likeImage = async (pikId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${pikId}`
  );
  const data = await res.json();
  const pikIdContainer = document.getElementById("likedId");
  pikIdContainer.classList.add(
    "grid",
    "lg:h-40",
    "mx-1",
    "gap-2",
    "py-1",
    "grid-cols-2"
  );
  const imageIdContainer = document.createElement("div");
  imageIdContainer.classList.add("border", "border-gray-300", "p-1", "m-1");
  imageIdContainer.innerHTML = `
    <img src=${data.petData.image}>
    `;
  pikIdContainer.appendChild(imageIdContainer);
};

let data = [];
const displayAllData = (pets) => {
  data = pets;
  const allDataAddContainer = document.getElementById("dataAllAdd");
  allDataAddContainer.innerHTML = "";
  if (pets.length == 0) {
    allDataAddContainer.classList.remove("grid");
    allDataAddContainer.innerHTML = `
    <div class="min-h-[400px] flex flex-col gap-5 justify-center items-center">
    <img src="/assets/error.webp">
    <h2 class="text-center text-xl font-bold">
    No Information Available
    </h2>
    <p class="text-xl text-gray-400 w-11/12  text-center">
    It seems like you may be referencing "No Information Available" as a possible message or response. Could you clarify what you're looking for? For example
    </p>
    </div>
    `;
    return;
  } else {
    allDataAddContainer.classList.add("grid");
  }
  pets.forEach((pets) => {
    // console.log(pets);
    const card = document.createElement("div");
    card.classList = "card card-compact py-6 px-6 shadow-xl";
    card.innerHTML = `
    <figure class="h-[200px]">
      <img
        src=${pets.image}
        class="h-full w-full object-cover"
        alt="Shoes" />
    </figure>
    <div class="">
      <h1 class="font-extrabold text-xl pt-5 pb-2">${pets.pet_name}</h1>
      <div class="flex space-x-2  items-center">
       <img class="h-5 w-5 object-cover" src="https://img.icons8.com/?size=64&id=0W1W77iQlek5&format=png"/>
        ${
          pets.breed === null || pets.breed === undefined
            ? "Breed: Not available"
            : ` <p>Breed:${pets.breed}</p>`
        }
      </div>
     <div class="flex space-x-2  items-center">
      <img class="h-5 w-5 object-cover" src="https://img.icons8.com/?size=48&id=5VOqBjvi7siv&format=png"/>
    ${
      pets.date_of_birth === null || pets.date_of_birth === undefined
        ? "Birth: Not available"
        : `<p>Birth:${pets.date_of_birth}</p>`
    }
     </div>


  <div class="flex space-x-2  items-center">
       <img class="h-5 w-5 object-cover" src="/assets/gender.png"/>
       ${
         pets.gender === null || pets.gender === undefined
           ? "Gender: Not available"
           : `<p>Gender:${pets.gender}</p>`
       }
      </div>

       <div class="flex space-x-2  items-center">
       <img class="h-5 w-5 object-cover" src="/assets/doller.png"/>
       ${
         pets.price === null || pets.price === undefined
           ? "Price: Not available"
           : `   <p>Price:${pets.price}$</p>`
       }
      </div>
   
      <hr>
      <img src=""/>
      <div class="md:flex sm:flex-col-1 sm:mt-5   sm:items-center sm:justify-center md:space-x-2 md:py-3 md:px-5 sm:px-2 md:justify-evenly ">
         <button><img onclick="likeImage(${
           pets.petId
         })" src="/assets/like.png" alt=""></button>
      
      <button class="border rounded-xl p-1 px-5">Adopt</button>
      <button onclick="loadDetailsButton('${
        pets.petId
      }')" class="border p-1 px-5 rounded-xl">Details</button>
      </div>
    </div>
      `;

    allDataAddContainer.append(card);
  });
};

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

//Load button cat dog etc...
const loadCategoryButton = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategoryButton(data.categories))
    .catch((error) => console.log(error));
};

const loadCategoryButtonId = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const activeButton = document.getElementById(`btn-${id}`);
      activeButton.classList.add("active");
      displayAllData(data.data);
    })
    .catch((error) => console.log(error));
};

//display button cat dog etc...
const displayCategoryButton = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categories.forEach((item) => {
    // console.log(item);
    // Create a Button Active korar jonno
    const button = document.createElement("button");
    button.id = `btn-${item.category}`;
    button.classList.add(
      "category-btn",
      "border-green-200",
      "items-center",
      "justify-center",
      "border",

      "px-10",
      "py-2",
      "rounded-full",
      "gap-3",
      "flex"
    );
    button.onclick = () => {
      loadCategoryButtonId(item.category);
    };
    button.innerHTML = `
          <img class='w-8' src=${item.category_icon}>
          ${item.category}
          `;
    categoriesContainer.appendChild(button);
  });
};

//sort by price
const displaySortbyPrice = () => {
  const sortDataPrice = [...data].sort((a, b) => b.price - a.price);
  displayAllData(sortDataPrice);
};
loadCategoryButton();
loadAllData();
