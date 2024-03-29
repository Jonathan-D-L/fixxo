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

async function getData() {
    let featuredCounter = 0;
    let newCounter = 0;
    let popularCounter = 0;
    const res = await fetch('https://kyh-net22.azurewebsites.net/api/products')
    const data = await res.json()

    try {
        for (let product of data) {
            const productHTML =
                `<div class="product-card">
                <div class="product-card-grid">
                    <div class="product-card-img">
                        <img src="${product.imageUrl}">
                        <div class="product-card-menu">
                        <nav class="menu-icons">
                        <a class="menu-link" href="#"><i class="fa-regular fa-code-compare"></i></a>
                        <a class="menu-link" id="menu-link-heart" href="#"><i class="fa-regular fa-heart"></i></a>
                        <a class="menu-link" href="#"><i class="fa-regular fa-bag-shopping"></i></a>
                        </nav>
                        <a href="#" class="btn-theme">QUICK VIEW</a>
                        </div>
                    </div>
                    <div class="product-card-body">
                        <p class="product-card-category">${product.category}</p>
                        <div class="product-card-title-container"><p class="product-card-title">${product.name}</p></div>
                        <div class="product-card-rating">${convertToStars(product.starRating)}</div>
                        <p class="product-card-price">${product.originalPrice} ${product.currency}</p>
                    </div>
                </div>
            </div>`

            if (product.tag === 'featured' && featuredCounter < 8) {
                document.getElementById('featured-products').innerHTML += productHTML;
                featuredCounter++;
            }
            if (product.tag === 'new' && newCounter < 6) {
                document.getElementById('new-products').innerHTML += productHTML
                newCounter++;
            }
            if (product.tag === 'popular' && popularCounter < 6) {
                document.getElementById('popular-products').innerHTML += productHTML
                popularCounter++;
            }
        }
    }
    catch {

    }
}
getData()

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
    document.getElementById("error-submit").innerHTML = '';
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

    if (!errors.includes(false)) {
        let inputName = document.getElementById('name');
        let inputEmail = document.getElementById('email');
        let inputComment = document.getElementById('comment');
        let submit = document.getElementById("error-submit")

        const form = {
            name: e.target[0].value,
            email: e.target[1].value,
            comments: e.target[2].value
        }

        const res = await fetch(`https://kyh-net22.azurewebsites.net/api/contacts`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })

        if (res.status === 200) {
            submit.style.color = "#000000";
            inputName.value = '';
            inputEmail.value = '';
            inputComment.value = '';
            submit.innerHTML = 'Thank you for your inquiry!'
            console.log('Success')
        }
        else {
            inputName.value = '';
            inputEmail.value = '';
            inputComment.value = '';
            submit.innerHTML = 'Something went wrong.'
            console.log('Error: ')
        }
    }
}