export type Track = {
	title: string;
	artist: string;
	trackUrl: string;
	image: {
		url: string;
		width: number;
		height: number;
		color: string;
	};
};

export type Artist = {
	name: string;
	artistUrl: string;
	image: {
		url: string;
		width: number;
		height: number;
		color: string;
	};
};

export type NowPlayingSong = {
	album: string;
	albumImageUrl: string;
	artist: string;
	artistId: string;
	isPlaying: boolean;
	songUrl: string;
	title: string;
};

export type TopTracks = {
	tracks: Track[];
};

export type TopArtists = {
	artists: Artist[];
};
