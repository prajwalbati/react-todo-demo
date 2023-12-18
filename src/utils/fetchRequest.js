
const sendRequest = async (url, method, needAuth, data) => {
    try {
        const apiUrl = process.env.REACT_APP_API_URL + url;
        const headers = {
            "Content-Type": "application/json"
        };
        if (needAuth) {
            headers['Authorization'] = `Bearer ${window.localStorage.accesstoken}`;
        }
        const fetchOptions = {
            method, headers
        };
        if (data) {
            fetchOptions['body'] = data;
        }
        let response = await fetch(apiUrl, fetchOptions);
        if (response.status === 401) {
            window.location.href = "/login";
        } else {
            return response;
        }
    } catch (err) {
      console.log(err);
    }
};

export default sendRequest;