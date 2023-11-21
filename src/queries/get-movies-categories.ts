import axios, { AxiosRequestConfig } from 'axios';

const getMoviesCategories = async () => {
	const options: AxiosRequestConfig = {
		method: 'get',
		url: `${process.env.API_BASE_URL}/genre/movie/list?language=en`,
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${process.env.API_READ_KEY}`,
		},
	};

	try {
		const response = await axios.request(options);
		return response;
	} catch (error) {
		return Promise.reject(new Error(error as string));
	}
};

export default getMoviesCategories;
