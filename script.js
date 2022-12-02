const insertProduct = (element) => {
    let initialDiv = document.createElement('div');
    initialDiv.setAttribute('class', 'col-4 ');

    let cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'card mb-5');

    let cardHead = document.createElement('div');
    cardHead.setAttribute('class', 'card-header text-center bg-dark text-light');

    cardHead.innerHTML = element.brand;

    let cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body text-center ');

    const image = document.createElement('img');
    image.src = element.image_link;
    image.alt = element.names;
    image.style.height = '200px';
    image.style.width = '100%';

    let productName = document.createElement('p');
    productName.innerHTML = `<b>Product Name</b> : ${element.names}`;
    productName.setAttribute('class', 'text-center ');

    let productLink = document.createElement('p');
    productLink.innerHTML = `<b>Product Link </b>: ${element.product_link}`;
    productLink.setAttribute('class', 'text-center');

    let priceSign = document.createElement('p');
    priceSign.innerHTML = `<b>Product Price </b>: ${element.price_sign} ${element.price} <strike>${element.price_sign}${element.price*2}</strike>`;
    priceSign.setAttribute('class', 'text-center');

    cardBody.append(image, productName, productLink, priceSign);

    cardDiv.append(cardHead, cardBody);

    initialDiv.appendChild(cardDiv);

    document.getElementById('container-row').appendChild(initialDiv);
}
async function makeUp() {
    let brand, names, image_link, product_link, description, price, price_sign;
    // let data = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
    let data = await fetch('FILENAME.json');
    let result = await data.json();
    // console.log(result[0]);
    for (let i = 0; i < 100; i++) {
        // console.log(result[i].brand);
        brand = result[i].brand;
        names = result[i].name;
        image_link = result[i].image_link;
        product_link = result[i].product_link;
        description = result[i].description;
        price = result[i].price;
        price_sign = result[i].price_sign;
        // console.log(brand);
        // console.log(names);
        // console.log(image_link);
        // console.log(product_link);
        // console.log(description);
        insertProduct({
            brand,
            names,
            image_link,
            product_link,
            description,
            price,
            price_sign
        })
    }
    let button = document.querySelector("#searchButton")
    button.addEventListener('click', () => {
        let val;
        myFunction();
        async function myFunction() {
            val = document.getElementById("inputSearch").value;
            // console.log(x);
            let searchBrand = await fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${val}`);
            let resultBrand = await searchBrand.json();
            const doc = document.getElementById('container-row').innerHTML = '<div style="display:none"></div>';
            // console.log(resultBrand);
            for (let j = 0; j < resultBrand.length; j++) {
                brand = resultBrand[j].brand;
                names = resultBrand[j].names;
                image_link = resultBrand[j].image_link;
                product_link = resultBrand[j].product_link;
                description = resultBrand[j].description;
                price = resultBrand[j].price;
                price_sign = resultBrand[j].price_sign;
                insertProduct({
                    brand,
                    names,
                    image_link,
                    product_link,
                    description,
                    price,
                    price_sign
                })
            }
        }
    })
}
makeUp();