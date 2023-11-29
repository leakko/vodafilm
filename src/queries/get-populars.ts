import axios, { AxiosRequestConfig } from 'axios';
import { Movie } from '../models/movie';
import { PopularsApiResponse } from '../models/populars-api-response';
import { Show } from '../models/show';

const getPopulars = async (isMovie: boolean) => {
	const options: AxiosRequestConfig = {
		method: 'get',
		url: `${process.env.API_BASE_URL}/${isMovie ? 'movie' : 'tv'}/popular?language=en-US&page=1`,
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${process.env.API_READ_KEY}`,
		},
	};

	try {
		const response = await axios.request<PopularsApiResponse<Movie> | PopularsApiResponse<Show>>(options);
		return response;
	} catch (error) {
		return Promise.reject(new Error(error as string));
	}
};

export default getPopulars;
