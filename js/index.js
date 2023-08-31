// Loading all the categories
const loadCategory = async () => {
    const fetchedCategory = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const response = await fetchedCategory.json()
    console.log(response.data);
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
        <button onclick='loadCategoryContents(${category.category_id})' class="bg-gray-300 px-4 py-2 font-medium rounded">${category.category}</button>`
        categoryContainer.appendChild(div)
    });
}

// loading category wise contents, default parameter is ll
const loadCategoryContents = async (categoryId) => {
    const fetchCategoryContents = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const response = await fetchCategoryContents.json()
    console.log(response.data);
    displayCategoryContents(response.data)

}

//displaying Category Wise contents
const displayCategoryContents = (contents) => {
    const cardContainer = document.getElementById('card-container')
    cardContainer.textContent = ""
    contents.forEach(content => {
        console.log(content);
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
                <figure><img src="${content.thumbnail}" alt="Shoes" /></figure>
                <div class="card-body">
                  <h2 class="card-title">
                  ${content.title}
                    <div class="badge badge-secondary">NEW</div>
                  </h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div class="card-actions justify-end">
                    <div class="badge badge-outline">Fashion</div> 
                    <div class="badge badge-outline">Products</div>
                  </div>
                </div>
              </div>
        `

        cardContainer.appendChild(div)
    })

}