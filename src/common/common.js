import axios from 'axios';

export class Utils {
	static performGet(props) { 
		return axios.get(props) 
	}

	static performPut(url, data) { 
		return axios.put(url, { ...data }, {headers: {"Content-Type": "application/json"}})
	}

	static createDictonary(props) {
		let obj = {};
		props.map(value => {
            return obj[value.id] = {...value};
        });
        return obj;
	}

	//Create array from object
	static createArray(props) {
		let arr = [];
		Object.keys(props).map(value => {
            return arr.push(props[value])
        });
        return arr;
	}
}
