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

