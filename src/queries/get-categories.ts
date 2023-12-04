import axios, { AxiosRequestConfig } from 'axios';
import { MovieCategoriesResponse } from '../models/movies-categories';
import { ShowCategoriesResponse } from '../models/shows-categories';

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
		const response = isMovie
			? await axios.request<MovieCategoriesResponse>(options)
			: await axios.request<ShowCategoriesResponse>(options);
		return response;
	} catch (error) {
		return Promise.reject(new Error(error as string));
	}
};

export default getCategories;
