import axios from "axios";

class ApiRequest {
    constructor() {
        this.instance = axios.create({
            baseURL: process.env.REACT_APP_API_URL
        })
    }
    paramBuilder(params) {
        let query = '?';
        for (const param in params) {
            query += `${param}=${params[param]}&`
        }
        return query.slice(0, query.length - 1);
    }
}

class DeckRequest extends ApiRequest {

    endPoint = '/decks';

    constructor(auth) {
        super();
        //implement auth if needed
    }

    getAll(params = false) {
        if (params === false)
            return this.instance.get(this.endPoint);
        return this.instance.get(this.endPoint + this.paramBuilder(params));
    }

    post(deck) {
        return this.instance.post(this.endPoint, deck);
    }

    patch(id, deck) {
        return this.instance.patch(`${this.endPoint}/${id}`, deck);
    }

    delete(id) {
        return this.instance.delete(`${this.endPoint}/${id}`);
    }

}

export {DeckRequest};
