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
       
        6. shows a error msg if there is no content in the selected category
           for this ---> in the function "displayPets()"
                -> check if the innerHTML of the container is empty or not
                -> if it's empty then remove 'grid' class and set the content which will show on the screen
                   else add 'grid' class
        
        7. to show the button is active-----
            -> set a "id" at the button in "displayCategories()" function
            -> go to "loadCategoryPets()" function
            -> then at the place of calling function get the button by id 
                -> set css style at "activeClass" class
                -> add "activeClass" class for active
            -> then call the "displayPets()" function

        8. Remove the active button
            -> created a function named "removeActiveClass()"
            -> set a 'class' at the button
            -> then in a 'for-of' loop remove "activeClass" class

        9. Show the pet details
            -> set a 'onclick' handeler at "Details" button named "loadDetails(${pet.petId})" here 'pet.petId' is the pet id which is the argument
            -> create a function named "loadDetails()" and set a parameter
            -> fetch the single pets Api (Ami ekhane async function use korchi)

        10. create a function named "showDetails()" and set a parameter

        11. get a "modal" from 'DaisyUi'

        12. set a id in modal button

        13. clear all content from modal and create a div with a Id

        14. in the function "showDetails()"
            -> get the id of the modal content
            -> set the inner html of modal
            -> get the modal button id and add "click()" handler

        15. Handle like button
            -> set class "h-fit" in selected pets div in html 
            -> create a function named "loadLikedPets()" and fetch the pet from API
            -> create a function named "addLikedPets()"
                -> get the container id
                -> create a div to add image
                -> set inner html 
                -> append the chiild to the container

        16. loading spinner
            -> get a spinner from daisyUi
            -> create a div just before the 'all pets' div
            -> write the spinner code in this div and set a class 'hidden'
            -> create a function named "loadingSpinner()"
                -> get the 'spinner' id
                -> if spinner is true then set the div empty and remove the class 'hidden'
                    else add the class 'hidden'
            -> in the functions "loadPets()" & "loadCategoryPets()" set a tiemout function .

        17. Sort By price
            -> declare a variable named 'pets' and assign it as an empty array
            -> in "loadPets()" & "loadCategoryPets()" assign the data in 'pets' variable
            -> create a function named "sortByPrice()"
                -> sor data & call display functions

*/
let pets = [];      // for sort

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
        <button id="category-btn-${item.category}" onclick="loadCategoryPets('${item.category}')" class="category-button w-[160px] hover:bg-[#0E7A811A] border-2 border-[#0E7A811A] hover:rounded-full py-2 flex justify-center items-center">
            <div class="flex gap-3"><img class="w-8" src="${item.category_icon}">${item.category}</div>
        </button>
       `;

        categoriesContainer.appendChild(categoryContainer);

    });
}

const loadPets = () => {
    loadingSpinner(true);
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
        setTimeout (() => {
            displayPets(data.pets)
            loadingSpinner(false);
        },2000)

        pets = data.pets;
    })
    .catch((error) => console.log(error));
}

const displayPets = (pets) => {
    console.log(pets);

    const petsContainer = document.getElementById('pet-container');

    petsContainer.innerHTML = "";

    // category te kono item na thakle error msg show korbe. tkhn grid ta remove kore dibe
    if(pets.length == 0){
        petsContainer.classList.remove('grid');
        petsContainer.innerHTML = `
        <div class="text-center px-20 py-36 min-h-[400px] w-full flex flex-col gap-5 justify-center items-center bg-[#13131308] rounded-2xl">
            <img src="images/error.webp" />
            <h2 class="text-3xl font-bold"> No Information Available </h2>
            <p class="text-[#131313B3]"> Currently, there is no specific information available about keeping birds as pets. This may be due to a lack of research or detailed studies on the subject. For those interested in adopting birds, it's important to gather relevant details from reliable sources, such as veterinarians, pet care experts, or bird enthusiasts.</p>
        </div>
        `;
        return;
    }
    else
        petsContainer.classList.add('grid');

    
    //item gulo add korbe
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
                    <button onclick="loadLikedPets(${pet.petId})" class="px-4 py-1 rounded-lg border-2 border-[#0E7A8126] text-[#0E7A81] font-bold"><img class="w-10" src="https://static.vecteezy.com/system/resources/previews/021/013/524/original/like-icon-on-transparent-background-free-png.png"></button>

                    <button onclick="adopt(this)" class="px-4 py-1 rounded-lg border-2 border-[#0E7A8126] text-[#0E7A81] font-bold">Adopt</button>

                    <button onclick="loadDetails(${pet.petId})" class="px-4 py-1 rounded-lg border-2 border-[#0E7A8126] text-[#0E7A81] font-bold"> Details </button>
                </div>

            </div>
        `;
        petsContainer.appendChild(petContainer);
    });
}

const loadCategoryPets = (categoryName) => {
    console.log(categoryName);
    loadingSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
    .then((res) => res.json())
    .then((datas) => {
        removeActiveClass();
        const activeButton = document.getElementById(`category-btn-${categoryName}`)
        activeButton.classList.add('activeClass') ;
        
        setTimeout (() => {
            displayPets(datas.data)
            loadingSpinner(false);
        },2000)
        pets = datas.data;
    })
    .catch((error) => console.log(error));
}

// remove active class
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-button");
    console.log(buttons);
    for(let btn of buttons){
       btn.classList.remove('activeClass');
    }
}

const loadDetails = async (petId) =>{
    console.log(petId);

    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    showDetails(data.
        petData);
}

const showDetails = (pets) => {
    console.log(pets);
    const detailsContainer = document.getElementById('modal-content');

    detailsContainer.innerHTML = `
    
        <img class="w-[350px] mx-auto rounded-md" src="${pets.image}">

        <div class="my-6">
            <h2 class="text-xl font-bold">${pets.pet_name}</h2>

            <div class="text-[#131313B3] flex gap-9 border-b pb-4">
                <div>
                    <p>Breed  : ${pets.breed}</p>
                    <p>Gender : ${pets.gender}</p>
                    <p>Vaccinated status : ${pets.vaccinated_status}</p>
                </div>
                <div>
                    <p>Birth  : ${pets.date_of_birth}</p>
                    <p>Price  : ${pets.price} $</p>
                </div>
            </div>
        </div>

        <div>
            <h3 class="text-lg font-bold"> Details Information </h3>
            <p class="text-[#131313B3]"> ${pets.pet_details}</p>
        </div>

    `;

    document.getElementById('showModalData').click();
}

const loadLikedPets = async (petId) =>{
    console.log(petId);

    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    addLikedPets(data.
        petData);
}

const addLikedPets = (pet) => {
    const imageContainer = document.getElementById('selected-pets');
    
    const likedPet = document.createElement('div');
        likedPet.innerHTML = `
        <img src="${pet.image}">
        `;
    imageContainer.appendChild(likedPet);
}

//bonus-1 : loading spinner
const loadingSpinner = (show) => {
    const spinner = document.getElementById('spinner');

    if(show){
        document.getElementById('pet-container').innerHTML = " ";
        spinner.classList.remove('hidden');
    }
    else{
        spinner.classList.add('hidden');
    }
}

//bonus-2 : Sort by Price
const sortByPrice = () => {
    console.log(pets)
    const sortedPet = pets.sort((a, b) => b.price - a.price)
    displayPets(sortedPet);
}

//bonus-3 : Adopt Button Behavior
const adopt = event => {
    let count = 3;
    const countNumber = document.getElementById('countdown');
    countNumber.innerText = count;
    my_modal_5.showModal()
    const interval = setInterval(() => {
        count--;
        if(count != 0){
            countNumber.innerText = count;
        }
        if(count === 0){
            clearInterval(interval)
            my_modal_5.close()

            event.innerText = 'Adopted'
            event.disabled = true; 
        }
    },1000)
}

//bonus-4 : Handle Null or Undefined Values

loadCategories();
loadPets();