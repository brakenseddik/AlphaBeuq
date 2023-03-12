const {API} = require("../config");
exports.signUp = (user) => {

    return (
        fetch(`${API}/auth/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                return res.json();
            })
            .catch(err => {
                console.log(err);
            })
    );
}
exports.signIn = (user) => {

    return (
        fetch(`${API}/auth/signin`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                return res.json();
            })
            .catch(err => {
                console.log(err);
            })
    );
}

exports.authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
}

exports.signOut = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem('jwt');

        next();

        return fetch(`${API}/auth/signout`,
            {method: "GET"})
            .then(response => {
                console.log('sign-out', response);
            })
            .catch(e => console.log(e))
    }
}

exports.isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    } else {
        if (localStorage.getItem('jwt')) {
            return JSON.parse(localStorage.getItem('jwt'));
        } else {
            return false;
        }
    }
}