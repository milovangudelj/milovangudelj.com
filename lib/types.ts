export type _Artist = {
	name: string;
	url: string;
	image: {
		url: string;
		width: number;
		height: number;
		color: string;
	};
};

export type _Song = {
	album: string;
	albumImageUrl: string;
	artist: string;
	artistId: string;
	isPlaying: boolean;
	songUrl: string;
	title: string;
};

export type _TopArtists = {
	artists: _Artist[];
};
