// Dependencias
const express = require("express");
const request = require('request');

// Router
const router = express.Router();

// Resultado de búsqueda
router.get("/items", (req, res) => {
    let search = req.query.q || '';
    request('https://api.mercadolibre.com/sites/MLA/search?q='+search, function(error, response, body) {
        if (!error) {
            const data = JSON.parse(body);
            if(data.results){
                let breadcrumb = [];
                if (data.filters[0] && data.filters[0].values[0]) {
                    breadcrumb = data.filters[0].values[0].path_from_root.map((category) => {return category.name});
                }
                // Límite 4 resultados
                let items = data.results.slice(0,4);
                items = items.map((item) => {
                    const amount = item.price;
                    const decimals = ((item.price%1).toFixed(2).substring(2))/100;

                    return {
                        id: item.id,
                        title: item.title,
                        price: {
                            currency: item.currency_id,
                            amount: amount + decimals, // Sumo decimales para aplicarlos con la librería "currency" del lado cliente,
                            decimals: decimals
                        },
                        picture: item.thumbnail,
                        condition: item.condition,
                        free_shipping: item.shipping ? item.shipping.free_shipping : false,
                        address: item.address ? item.address.state_name : ''
                    }
                });
                let result = {
                    author: {
                        name: 'Franco',
                        lastname: 'Cirulli'
                    },
                    categories: breadcrumb,
                    items: items
                }
                res.send(result);
            }
        } else {
          res.send('Error al hacer la request, error: '+error);
        }
    });
});

// Detalle de producto
router.get("/items/:id", (req, res) => {
    let id = req.params.id;
    request('https://api.mercadolibre.com/items/'+ id, function(error, response, body) {
        if (!error) {
            const data = JSON.parse(body);
            if (!data.error) {
                let picture = data.pictures.length ? data.pictures[0].secure_url : '';
                let category = data.category_id;
                let amount = data.price;
                let decimals = ((data.price%1).toFixed(2).substring(2))/100;
                var detail = {
                    author: {
                        name: 'Franco',
                        lastname: 'Cirulli'
                    },
                    categories: [],
                    item: {
                        id: data.id,
                        title: data.title,
                        price: {
                            currency: data.currency_id,
                            amount: amount + decimals, // Sumo decimales para aplicarlos con la librería "currency" del lado cliente
                            decimals: decimals
                        },
                        picture: picture,
                        condition: data.condition,
                        free_shipping: data.shipping ? data.shipping.free_shipping : false,
                        sold_quantity: data.sold_quantity,
                        description: ''
                    }
                }
                request('https://api.mercadolibre.com/items/'+id+'/description', function(error, response, body) {
                    if (!error) {
                        const data = JSON.parse(body);
                        if (!data.error) {
                            detail.item.description = data.plain_text;
                        }
                        request('https://api.mercadolibre.com/categories/'+category, function(error, response, body) {
                            if (!error) {
                                const data = JSON.parse(body);
                                if (!data.error) {
                                    detail.categories = categories = data.path_from_root.map((category) => {return category.name});
                                }
                                res.send(detail);
                            } else {
                                res.send('Error');
                            }
                        });
                    } else {
                        res.send('Error');
                    }
                });
            } else {
                res.send(data)
            }
        } else {
            res.send('Error');
        }
    });
});

module.exports = router;
