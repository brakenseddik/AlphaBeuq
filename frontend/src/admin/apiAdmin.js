const {API} = require("../config");
exports.createCategory = (userId, token, category) => {

    return (
        fetch(`${API}/categories/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        })
            .then(res => {
                return res.json();
            })
            .catch(err => {
                console.log(err);
            })
    );
}
exports.createProduct = (userId, token, product) => {

    return (
        fetch(`${API}/products/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: product
        })
            .then(res => {
                return res.json();
            })
            .catch(err => {
                console.log(err);
            })
    );
}

exports.getCategories = () => {
    return (
        fetch(`${API}/categories`, {
            method: "GET"
        })
            .then(res => {
                return res.json();
            })
            .catch(err => {
                console.log(err);
            })
    );
}
