/*
        --------------------------OVERVIEW--------------------------

        1. Created a function "loadCategories()" to fetch all categories
        2. Created a function "displayCategories()" to display all category as a button
            -> passed 'categories' as argument
            -> created a 'container' by the id where(in HTML file) the categories will show
            -> passed all categories in a loop "Foreach"
            -> in this loop created a div
            -> in this div set innerhtml of button
            -> child(new created div) is appened in parent (container)
        3. Created a function "loadPets()" as same as the function "loadCategories()" to fetch all pets
        4. Created a function "displayPets()" as the function "displayCategories()"  to display all pets in card
        5. Created a function "loadCategoryPets()" to display pets by category
            -> passed "category name" as parameter
            -> Added onclick handler at the 'button' in the funcion "displayCategories()" and passed "category name" as argument
            -> called "displayPets()" function

*/

const loadCategories = () => {
    //Fetch the data
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
}

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories');
    
    categories.forEach((item) => {
    console.log(item);

        const categoryContainer = document.createElement('div');
        categoryContainer.innerHTML = `
        <button onclick="loadCategoryPets('${item.category}')" class="w-[160px] hover:bg-[#0E7A811A] border-2 border-[#0E7A811A] hover:rounded-full py-2 flex justify-center items-center">
            <div class="flex gap-3"><img class="w-8" src="${item.category_icon}">${item.category}</div>
        </button>
       `;

        categoriesContainer.appendChild(categoryContainer);

    });
}

const loadPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayPets(data.pets))
    .catch((error) => console.log(error));
}

const displayPets = (pets) => {
    console.log(pets);
    const petsContainer = document.getElementById('pet-container');

    petsContainer.innerHTML = "";
    pets.forEach((pet) => {
    console.log(pet);

        const petContainer = document.createElement('div');
        petContainer.classList = "card rounded-xl border-2 border-[#1313131A]";
        petContainer.innerHTML = `
        
            <figure class="p-4">
            <img src="${pet.image}"class="rounded-lg" />
            </figure>

            <div class="card-body">

                <h2 class="text-xl font-bold">${pet.pet_name}</h2>

                <p class="text-[#131313B3]">Breed  : ${pet.breed}</p>
                <p class="text-[#131313B3]">Birth  : ${pet.date_of_birth}</p>
                <p class="text-[#131313B3]">Gender : ${pet.gender}</p>
                <p class="text-[#131313B3]">Price  : ${pet.price} $</p>

                <div class="card-actions">
                    <button class="px-4 py-1 rounded-lg border-2 border-[#0E7A8126] text-[#0E7A81] font-bold"><img class="w-10" src="https://static.vecteezy.com/system/resources/previews/021/013/524/original/like-icon-on-transparent-background-free-png.png"></button>

                    <button class="px-4 py-1 rounded-lg border-2 border-[#0E7A8126] text-[#0E7A81] font-bold">Adopt</button>

                    <button class="px-4 py-1 rounded-lg border-2 border-[#0E7A8126] text-[#0E7A81] font-bold">Details</button>
                </div>

            </div>
        `;
        petsContainer.appendChild(petContainer);
    });
}

const loadCategoryPets = (categoryName) => {
    console.log(categoryName);
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
    .then((res) => res.json())
    .then((datas) => displayPets(datas.data))
    .catch((error) => console.log(error));
}


loadCategories();
loadPets();