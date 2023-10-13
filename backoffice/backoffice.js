// aggiunta opzione MODIFICA
const addressBarItem = new URLSearchParams(window.location.search)
const itemId = addressBarItem.get('itemId')
console.log(itemId)

if (itemId){
    fetch('https://striveschool-api.herokuapp.com/api/product/' + itemId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MDBiZjEzOWM0MzAwMTg4MTQ1YTQiLCJpYXQiOjE2OTcxODU5ODMsImV4cCI6MTY5ODM5NTU4M30.wP6MsuPJYPiOye8GBvEVpd8uUPJMMBbtOT1gmQva5x4"
        }
    })
    .then(res => {
        if(res.ok){
            return res.json()
        } else {
            throw new Error ('Errore nel recupero dettaglio')
        }
    })
    .then((itemDetals) => {
        const nameInput = document.getElementById('name-form')
        const descriptionInput = document.getElementById('description-form')
        const brandInput = document.getElementById('brand-form')
        const imageInput = document.getElementById('imageUrl-form')
        const priceInput = document.getElementById('price-form')

        nameInput.value = itemDetals.name
        descriptionInput.value = itemDetals.description
        brandInput.value = itemDetals.brand
        imageInput.value = itemDetals.imageUrl
        priceInput.value = itemDetals.price
    })
    .catch(err => {console.log(err)})
}


const form = document.getElementById('form')

form.addEventListener('submit', function(e){
    e.preventDefault()
    console.log('invio dati')

    const nameInput = document.getElementById('name-form')
    const descriptionInput = document.getElementById('description-form')
    const brandInput = document.getElementById('brand-form')
    const imageInput = document.getElementById('imageUrl-form')
    const priceInput = document.getElementById('price-form')

    const newItem = {
        name: nameInput.value,
        description: descriptionInput.value,
        brand: brandInput.value,
        imageUrl: imageInput.value,
        price: priceInput.value,
    }
    console.log(newItem)

    let methodToUse = 'POST'
    if(itemId){
        methodToUse = 'PUT'
    }

    let urlToUse = 'https://striveschool-api.herokuapp.com/api/product/'
    if(itemId){
        urlToUse = 'https://striveschool-api.herokuapp.com/api/product/' + itemId
    }

    // mandarlo all'API
    fetch(urlToUse, {
        method: methodToUse,
        body: JSON.stringify(newItem),
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MDBiZjEzOWM0MzAwMTg4MTQ1YTQiLCJpYXQiOjE2OTcxODU5ODMsImV4cCI6MTY5ODM5NTU4M30.wP6MsuPJYPiOye8GBvEVpd8uUPJMMBbtOT1gmQva5x4"
        }
    })
    .then((res) => {
        if(res.ok){
            alert('ELEMENTO SALVATO CORRETTAMENTE')
            location.assign('../index/index.html')
        } else {
            alert('ERRORE NEL SALVATAGGIO')
            throw new Error ('Errore nella POST')
        }
    })
    .catch((err) => {
        console.log(err)
    })

})