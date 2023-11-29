export interface Movie {
	adult: boolean;
	backdrop_path: null | string;
	genre_ids: number[];
	id: number;
	original_language: OriginalLanguage;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	isFavorite?: boolean;
}

export enum OriginalLanguage {
	En = 'en',
	Hi = 'hi',
	Ja = 'ja',
}
