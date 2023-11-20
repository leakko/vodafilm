import axios, { AxiosRequestConfig } from 'axios';
import CONSTANTS from '../assets/constants';

const getMoviesCategories = async () => {
	const options: AxiosRequestConfig = {
		method: 'get',
		url: `${CONSTANTS['API-BASE-URL']}/genre/movie/list?language=en`,
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${CONSTANTS['API-READ-KEY']}`,
		},
	};

	try {
		const response = await axios.request(options);
		console.log(response);
		return response;
	} catch (error) {
		return Promise.reject(new Error(error as string));
	}
};

export default getMoviesCategories;
