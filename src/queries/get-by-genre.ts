import axios, { AxiosRequestConfig } from 'axios';
import { Movie } from '../models/movie';
import { MovieCategoryId } from '../models/movies-categories';
import { TmdbApiResponse } from '../models/populars-api-response';
import { Show } from '../models/show';
import { ShowCategoryId } from '../models/shows-categories';

const getByGenre = async (isMovie: boolean, genre: MovieCategoryId | ShowCategoryId) => {
	const options: AxiosRequestConfig = {
		method: 'get',
		url: `${process.env.API_BASE_URL}/discover/${
			isMovie ? 'movie' : 'tv'
		}?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`,
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${process.env.API_READ_KEY}`,
		},
	};

	try {
		const response = await axios.request<TmdbApiResponse<Movie> | TmdbApiResponse<Show>>(options);
		return response;
	} catch (error) {
		return Promise.reject(new Error(error as string));
	}
};

export default getByGenre;
