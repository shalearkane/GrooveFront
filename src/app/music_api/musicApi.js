import { createApi } from '@reduxjs/toolkit/query/react'
import axiosInstance from '../axiosInstance';

export const musicApi = createApi({
    reducerPath: "musicApi",
    baseQuery: axiosInstance,
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
            })
        }),
        likeSong: builder.query({
            query: (trackid) => ({
                method: "post",
                url: `likedsongs/`,
                body: `{"track" : "${trackid}"}`
            })
        }),
        unlikeSong: builder.query({
            query: (trackid) => ({
                method: "delete",
                url: `likedsongs`,
                body: `{"track" : "${trackid}"}`
            })
        }),
        getHistory: builder.query({
            query: () => ({
                method: "get",
                url: `history/`,
            })
        }),
        addToHistory: builder.query({
            query: (trackid) => ({
                method: "post",
                url: `history/`,
                body: `{"track" : "${trackid}"}`
            })
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
    useGetSpecificGenreQuery } = musicApi;