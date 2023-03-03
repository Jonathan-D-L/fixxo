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

async function getProducts(target, tag) {
    const element = document.querySelector(target)
    const res = await fetch(`https://kyh-net22.azurewebsites.net/api/products/${tag}`)
    const data = await res.json()
    for (let item of data) {
        // element.innerHTML +=

    }
}

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