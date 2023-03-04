const arrow = document.getElementById('top-arrow')
arrow.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: "smooth" })
})
window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY
    if (scrollPosition >= 100) {
        arrow.style.display = 'block'
    } else {
        arrow.style.display = 'none'
    }
})

function convertToStars(starRating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= starRating) {
            stars += '<i class="fa-solid fa-sharp fa-star"></i>';
        } else {
            stars += '<i class="fa-regular fa-sharp fa-star"></i>';
        }
    }
    return stars;
}

/*  
    category: 
    currency: 
    discountPrice: 
    imageUrl: 
    name: 
    originalPrice: 
    starRating: 
    tag:
*/

async function getData() {
    const res = await fetch('https://kyh-net22.azurewebsites.net/api/products')
    const data = await res.json()
    for (let product of data) {
        console.log(product)
        if (product.tag === 'featured') {
            document.getElementById('products').innerHTML +=
                `<div class="product-card">
                <div class="product-card-img">
                <img src="${product.imageUrl}">
                <div class="product-card-menu">
                <nav class="menu-icons">
                <a class="menu-link" href="#"><i class="fa-regular fa-code-compare"></i></a>
                <a class="menu-link" href="#"><i class="fa-regular fa-heart"></i></a>
                <a class="menu-link" href="#"><i class="fa-regular fa-bag-shopping"></i></a>
                </nav>
                <a href="#" class="btn-theme">QUICK VIEW</a>
                </div>
                </div>
                <div class="product-card-body">
                <p class="product-card-category">${product.category}</p>
                <p class="product-card-title">${product.name}</p>
                <div class="product-card-rating">
                ${convertToStars(product.starRating)}
                </div>
                <p class="product-card-price">${product.originalPrice} ${product.currency}</p>
                </div>
        </div>`
        }
    }
}
getData()

//apiname/swagger

async function handleContactForm(e) {
    e.preventDefault()

    const form = {
        name: "",
        email: "",
        comments: ""
    }

    const res = await fetch(`https://kyh-net22.azurewebsites.net/api/contacts`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    })
    if (res.status === 200) {
        console.log('Tack för din förfrågan!')
    }
}