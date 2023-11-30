export interface MovieCategoriesResponse {
	genres: MovieCategory[];
}

export interface MovieCategory {
	id: MovieCategoryId;
	name: string;
}

export type MovieCategoryId =
	| 28
	| 12
	| 16
	| 35
	| 80
	| 99
	| 18
	| 10751
	| 14
	| 36
	| 27
	| 10402
	| 9648
	| 10749
	| 878
	| 10770
	| 53
	| 10752
	| 37;
