// Loading all the categories
const loadCategory = async () => {
    const fetchedCategory = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const response = await fetchedCategory.json()
    //console.log(response.data);
    displayCategory(response.data)
    loadCategoryContents(response.data[0].category_id)
}
loadCategory()

// Displaying Category
const displayCategory = (fetchedCategories) => {
    const categoryContainer = document.getElementById('category-container')
    fetchedCategories.forEach(category => {
        const div = document.createElement('div')
        div.innerHTML = `
        <button onclick='loadCategoryContents(${category.category_id})' class="bg-gray-300 px-2 md:px-4 py-1 md:py-2 font-medium rounded">${category.category}</button>`
        categoryContainer.appendChild(div)
    });
}

// loading category wise contents, default parameter is all
const loadCategoryContents = async (categoryId) => {
    const fetchCategoryContents = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const response = await fetchCategoryContents.json()
    //console.log(response.data);
    displayCategoryContents(response.data)

}

//displaying Category Wise contents
const displayCategoryContents = (contents) => {
    const cardContainer = document.getElementById('card-container')
    cardContainer.textContent = ""
    console.log(contents);
    if(contents.length == 0){
        const imgDiv = document.createElement('div')
        imgDiv.innerHTML = `
        <img class="cols-span-2" src="./images/Icon.png" alt="">
        `
        cardContainer.appendChild(imgDiv)
    }
    contents.forEach(content => {
        //console.log(content.others.posted_date);
        let hour = 0
        let min = 0
        if(content.others.posted_date){
            const timeStringToNumber = parseInt(content.others.posted_date)
            hour = timeStringToNumber / 60
            min = timeStringToNumber % 60
        }
        let time = parseInt(hour)+"hrs "+parseInt(min)+"min ago"
        
        //console.log(time);
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="single-card-container ">
                <div class="image-container relative mb-5">
                    <img class="rounded-lg h-40 w-full cover" src="${content.thumbnail}" alt="">
                    <p id="time-container" class="absolute bottom-2 right-2 bg-black text-white rounded">${content.others.posted_date?time:''}</p>
                </div>
                <div class="card-description-container flex gap-3">
                    <div class="profile-picture-container">
                        <img class="rounded-full h-10 w-10 cover" src="${content.authors[0].profile_picture}" alt="">
                    </div>
                    <div >
                        <h1 class="mb-2 font-bold">${content.title}</h1>
                        <div id="verified-container" class="flex gap-2 mb-2">
                            <p class="text-gray-500">${content.authors[0].profile_name}</p>
                            <p>${content.authors[0]?.verified?'<img src="./js/verified.svg"></img>':''}</p>
                        </div>
                        <p class="text-gray-500">${content.others.views}</p>
                    </div>
    
                </div>
            </div>
        `

        cardContainer.appendChild(div)
        const setInvisible = document.getElementById('time-container')
        
    })

}