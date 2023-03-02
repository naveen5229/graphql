const URL = `http://localhost:5000/graphql`;

const apiService = (props) => {

    const bodyParam = JSON.stringify(props.query);
    return fetch(URL, {
        method: 'POST',
        body: bodyParam,
        headers: {
            'Content-Type': 'Application/json',
            'Authorization': `Bearer ${props.token}`
        }
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        throw err;
    })
}

export default apiService;