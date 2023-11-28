import axios, { AxiosRequestConfig } from 'axios';

const getCategories = async (isMovie: boolean) => {
	const options: AxiosRequestConfig = {
		method: 'get',
		url: `${process.env.API_BASE_URL}/genre/${isMovie ? 'movie' : 'tv'}/list?language=en`,
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

export default getCategories;
