const renderItem = function(arrayOfItem){

    const row = document.getElementById('row')

    arrayOfItem.forEach(newItem => {
        const newCol = document.createElement('div')
        newCol.classList.add('col', 'col-12', 'col-sm-6', 'col-md-4', 'mb-2')
        newCol.innerHTML = `
        <div class="card mt-5 h-100 scale shadow p-3 mb-5 bg-body-tertiary rounded">
            <img src="${newItem.imageUrl}" class="card-img-top" alt="img-item">
            <div class="card-body d-flex flex-column justify-content-between">
                <h5 class="card-title">${newItem.name}</h5>
                <p class="card-text"><em>${newItem.brand}</em></p>
                <p class="card-text">${newItem.description}</p>
                <p class="card-text">Prezzo: ${newItem.price}€</p>
                <a href="../details/details.html?itemId=${newItem._id}" class="btn btn-danger">Dettagli</a>
            </div>
        </div>
        `
        row.appendChild(newCol)
    });
}

const hideSpinner = function(){
    const spinner = document.getElementById('spinner')
    spinner.classList.add('d-none')
}

const getItem = function(){
    fetch('https://striveschool-api.herokuapp.com/api/product/', {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MDBiZjEzOWM0MzAwMTg4MTQ1YTQiLCJpYXQiOjE2OTcxODU5ODMsImV4cCI6MTY5ODM5NTU4M30.wP6MsuPJYPiOye8GBvEVpd8uUPJMMBbtOT1gmQva5x4"
        }
    })
    .then((res) => {
        hideSpinner()
        console.log('response', res)
        if(res.ok){
            return res.json()
        } else {
            throw new Error ('Errore nel contattare il server')
        }
    })
    .then((item) => {
        renderItem(item)
    })
    .catch((err) => {
        hideSpinner()
        console.log(err)})
}
getItem()