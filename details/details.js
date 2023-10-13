// recupero l'id
const addressBarItem = new URLSearchParams(window.location.search)
const itemId = addressBarItem.get('itemId')
console.log(itemId)

const deleteItem = function(){
    fetch('https://striveschool-api.herokuapp.com/api/product/' + itemId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MDBiZjEzOWM0MzAwMTg4MTQ1YTQiLCJpYXQiOjE2OTcxODU5ODMsImV4cCI6MTY5ODM5NTU4M30.wP6MsuPJYPiOye8GBvEVpd8uUPJMMBbtOT1gmQva5x4"
        }
    })
    .then(res => {
        if(res.ok){
            alert('PRODOTTO ELIMINATO')
            location.assign('../index/index.html')
        } else {
            alert('Problema con eliminazione')
            throw new Error('Errore nella delete')
        }
    })
    .catch(err => {console.log(err)})
}

const generateItemDetails = function(details){
    const rowDetails = document.getElementById('item-details')
    rowDetails.innerHTML = `
    <div class="col col-12 my-5 shadow p-3 mb-5 bg-body-tertiary rounded">
        <h2 class="text-center fs-4">DETTAGLI PRODOTTO</h2>
        <div class="d-flex justify-content-center ">
        <img src="${details.imageUrl}" alt="immagine-item" class="w-50" />
        </div>
        <div class="d-flex flex-column align-items-center">
            <h3 class="text-center mt-2">${details.name}</h3>
            <p class="fs-5">${details.brand}</p>
            <p>${details.description}</p>
            <p>Prezzo: ${details.price}€</p>
            <div class="d-flex justify-content-center w-100">
                <button class="btn btn-outline-danger w-30 me-1" type="button" onclick="deleteItem()">
                Elimina
                </button>
                    <a class="btn btn-outline-danger w-30" href="../backoffice/backoffice.html?itemId=${details._id}">
                Modifica
                </a>
            </div>
        </div>
    </div>
    `
}


const getSingleItemDetails = function(){
    fetch('https://striveschool-api.herokuapp.com/api/product/' + itemId, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MDBiZjEzOWM0MzAwMTg4MTQ1YTQiLCJpYXQiOjE2OTcxODU5ODMsImV4cCI6MTY5ODM5NTU4M30.wP6MsuPJYPiOye8GBvEVpd8uUPJMMBbtOT1gmQva5x4"
        }
    })
    .then((res) => {
        if(res.ok){
            return res.json()
        } else {
            throw new Error ('Errore nel caricamento dei dettagli')
        }
    })
    .then(itemData => {
        generateItemDetails(itemData)
    })
    .catch((err) => {
        console.log(err)
    })
}
getSingleItemDetails()