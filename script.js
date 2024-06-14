const URL = "https://striveschool-api.herokuapp.com/api/product/";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3M2VmOTdmNmI0YjAwMTU0MjhmYmQiLCJpYXQiOjE3MTgwOTEyNDQsImV4cCI6MTcxOTMwMDg0NH0.HJV_TZI6CU1CRPMdudzFuE5ufe05Hb1KKIHBw8Wmsis';

// Funzione per inviare un prodotto
const inviaProdotto = (prodotto) => {
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(prodotto)
    })
    .then(response => response.json())
    .catch(error => console.error('Errore:', error));
};

// Funzione per recuperare i prodotti
const recuperaProdotti = () => {
    return fetch(URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .catch(error => console.error('Errore:', error));
};

// Funzione per recuperare un singolo prodotto
const recuperaProdotto = (id) => {
    return fetch(`${URL}${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .catch(error => console.error('Errore:', error));
};

// Funzione per modificare un prodotto
const modificaProdotto = (id, prodotto) => {
    return fetch(`${URL}${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(prodotto)
    })
    .then(response => response.json())
    .catch(error => console.error('Errore:', error));
};

// Funzione per eliminare un prodotto
const eliminaProdotto = (id) => {
    return fetch(`${URL}${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nella richiesta');
        }
        return response.json();
    })
    .then(data => {
        console.log('Eliminazione riuscita', data);
        return data;
    })
    .catch(error => {
        console.error('Errore:', error);
        return { message: 'Errore durante l\'eliminazione' };
    });
};




// Funzione per visualizzare i prodotti
const visualizzaProdotti = (prodotti) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Pulisce la lista dei prodotti

    prodotti.forEach(prodotto => {
        const productItem = document.createElement('div');
        productItem.innerHTML = `
            <h2><a href="product.html?id=${prodotto._id}">${prodotto.name}</a></h2>
            <p>${prodotto.description}</p>
            <p>Brand: ${prodotto.brand}</p>
            <p>Prezzo: €${prodotto.price}</p>
            <img src="${prodotto.imageUrl}" alt="${prodotto.name}" width="200">
        `;
        productList.appendChild(productItem);
    });
};

// Funzione per visualizzare i prodotti nel backoffice
const visualizzaProdottiBackoffice = (prodotti) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Pulisce la lista dei prodotti? te lo dico poi 

    prodotti.forEach(prodotto => {
        const productItem = document.createElement('div');
        productItem.innerHTML = `
            <h2>${prodotto.name}</h2>
            <p>${prodotto.description}</p>
            <p>Brand: ${prodotto.brand}</p>
            <p>Prezzo: €${prodotto.price}</p>
            <img src="${prodotto.imageUrl}" alt="${prodotto.name}" width="200">
            <button onclick="modificaProdottoForm('${prodotto._id}')">Modifica</button>
            <button onclick="eliminaProdotto('${prodotto._id}').then(() => location.reload())">Elimina</button>
        `;
        productList.appendChild(productItem);
    });
};

// Funzione per popolare il form con i dati del prodotto per la modifica
const modificaProdottoForm = (id) => {
    recuperaProdotto(id).then(prodotto => {
        document.getElementById('product-id').value = id;
        document.getElementById('name').value = prodotto.name;
        document.getElementById('description').value = prodotto.description;
        document.getElementById('brand').value = prodotto.brand;
        document.getElementById('imageUrl').value = prodotto.imageUrl;
        document.getElementById('price').value = prodotto.price;
    });
};

// Funzione per visualizzare i dettagli del prodotto
const visualizzaDettaglioProdotto = (prodotto) => {
    const productDetail = document.getElementById('product-detail');
    productDetail.innerHTML = `
        <h2>${prodotto.name}</h2>
        <p>${prodotto.description}</p>
        <p>Brand: ${prodotto.brand}</p>
        <p>Prezzo: €${prodotto.price}</p>
        <img src="${prodotto.imageUrl}" alt="${prodotto.name}" width="200">
    `;
};
