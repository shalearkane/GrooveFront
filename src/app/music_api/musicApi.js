import { createApi } from '@reduxjs/toolkit/query/react'
import axiosInstance from '../axiosInstance';

export const musicApi = createApi({
    reducerPath: "musicApi",
    baseQuery: axiosInstance,
    tagTypes: ['Like', 'History'],
    endpoints: (builder) => ({
        getTrackList: builder.query({
            query: () => `tracks/`,
        }),
        getAlbumList: builder.query({
            query: () => `albums/`
        }),
        getSpecificAlbum: builder.query({
            query: (id) => `albums/${id}`
        }),
        getArtistList: builder.query({
            query: () => `artists/`
        }),
        getSpecificArtist: builder.query({
            query: (id) => `artists/${id}`
        }),
        getGenreList: builder.query({
            query: () => `genres/`
        }),
        getSpecificGenre: builder.query({
            query: (id) => `genres/${id}`
        }),
        getLikedSongs: builder.query({
            query: () => ({
                method: "get",
                url: `likedsongs/`,
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Like', id })), 'Post']
                    : ['Post'],
            // id here refers to the id of track in json data, so it is uniquely tagged
        }),
        isLiked: builder.query({
            query: (trackid) => ({
                method: "get",
                url: `likedsongs/`,
                body: `{"track" : "${trackid}"}`,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Like', id: arg }],
            // here arg refers to trackid I suppose
        }),
        likeSong: builder.mutation({
            query: (trackid) => ({
                method: "post",
                url: `likedsongs/`,
                body: `{"track" : "${trackid}"}`
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Like', id: arg }],
        }),
        unlikeSong: builder.mutation({
            query: (trackid) => ({
                method: "delete",
                url: `likedsongs`,
                body: `{"track" : "${trackid}"}`
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Like', id: arg }],
        }),
        getHistory: builder.query({
            query: () => ({
                method: "get",
                url: `history/`,
            }),
            providesTags: ['History']
        }),
        addToHistory: builder.mutation({
            query: (trackid) => ({
                method: "post",
                url: `history/`,
                body: `{"track" : "${trackid}"}`
            }),
            invalidatesTags: ['History'],
        }),
    })
})

export const {
    useGetTrackListQuery,
    useGetAlbumListQuery,
    useGetSpecificAlbumQuery,
    useGetArtistListQuery,
    useGetSpecificArtistQuery,
    useGetGenreListQuery,
    useGetSpecificGenreQuery,
    useGetLikedSongsQuery,
    useIsLikedQuery,
    useLikeSongMutation,
    useUnlikeSongMutation,
    useGetHistoryQuery,
    useAddToHistoryMutation } = musicApi;

// Mutations are used to send data updates to the server and apply the changes to the local cache. 
// Mutations can also invalidate cached data and force re-fetches.