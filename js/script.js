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
    try {
        for (let product of data) {
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
    catch {

    }
}
getData()



//apiname/swagger



function validateEmail(element) {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const errorElement = document.getElementById(`error-${element.name}`)

    if (!regEx.test(element.value)) {
        errorElement.innerHTML = `You must provide an valid e-mail address.`
        return false
    }
    errorElement.innerHTML = ``
    return true
}

function validateName(element) {
    const regEx = /^([a-öA-Ö\u00C0-\u017F]+(([' -][a-öA-Ö])?[a-öA-Ö]*)){2,}$/
    const errorElement = document.getElementById(`error-${element.name}`)
    if (!regEx.test(element.value)) {
        errorElement.innerHTML = `You must provide a valid name.`
        return false
    }
    errorElement.innerHTML = ``
    return true
}

function validateComment(element) {
    const errorElement = document.getElementById(`error-${element.name}`)
    if (element.value.trim() === '') {
        errorElement.innerHTML = `You must provide a comment.`
        return false
    }
    errorElement.innerHTML = ``
    return true
}

function validate(event) {
    switch (event.target.name) {
        case 'email':
            validateEmail(event.target)
            break;
        case 'name':
            validateName(event.target)
            break;
        case 'comment':
            validateComment(event.target)
            break;
    }
}

async function handleSubmit(e) {
    e.preventDefault()
    const errors = []
    const errorMessage = document.getElementById('error-submit')
    errorMessage.innerHTML = ''

    for (let element of e.target) {
        if (element.required) {
            const errorElement = document.getElementById(`error-${element.name}`)
            if (element.value.length === 0) {
                switch (element.name) {
                    case 'email':
                        errorElement.innerHTML = `You must provide an valid ${element.name} adress.`
                        break
                    case 'name':
                        errorElement.innerHTML = `You must provide a valid ${element.name}.`
                        break
                    case 'comment':
                        errorElement.innerHTML = `You must provide a ${element.name}.`
                        break
                }
                errors.push(false)
            } else {
                errorElement.innerHTML = ``

                switch (element.name) {
                    case 'email':
                        errors.push(validateEmail(element))
                        break
                    case 'name':
                        errors.push(validateName(element))
                        break
                    case 'comment':
                        errors.push(validateComment(element))
                        break
                }
            }
        }
    }
}



// async function handleContactForm(e) {
//     e.preventDefault()

//     const form = {
//         name: "",
//         email: "",
//         comments: ""
//     }

//     const res = await fetch(/*`https://kyh-net22.azurewebsites.net/api/contacts`*/'', {
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(form)
//     })

//     if (res.status === 200) {
//         console.log('Tack för din förfrågan!')
//     }
//     else{
//         console.log('error')
//     }
// }