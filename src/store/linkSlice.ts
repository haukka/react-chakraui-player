import { createSlice, nanoid } from "@reduxjs/toolkit";

interface IInformation {
    id: number,
    title: string,
    url: string,
    autoreplay: boolean,
    current: boolean
}

interface IState {
    twitch: IInformation[],
    video: IInformation[],
    music: IInformation[]
}

const initialState: IState = {
    twitch: [],
    video: [],
    music: []
}

const linkSlice = createSlice({
    name: 'linkData',
    initialState,
    reducers: {
        addTwichVideo: {
            reducer: (state, action) => {
                state.twitch.push(action.payload);
            },
            prepare: (data): any => {
                const id = nanoid()
                return { payload: { id, ...data, current: false, autoreplay: false } }
            },
        },
        addVideo: {
            reducer: (state, action) => {
                state.video.push(action.payload);
            },
            prepare: (data): any => {
                const id = nanoid()
                return { payload: { id, ...data, current: false, autoreplay: false } }
            },
        },
        addMusic: {
            reducer: (state, action) => {
                state.music.push(action.payload);
            },
            prepare: (data): any => {
                const id = nanoid()
                return { payload: { id, ...data, current: false, autoreplay: false } }
            },
        },
        removeFromPlaylist: (state, action) => {
            if (action.payload.category === 'video') {
                state.video = state.video.filter((video: any) => video.id !== action.payload.id);
            } else if (action.payload.category === 'twitch') {
                state.twitch = state.twitch.filter((twitch: any) => twitch.id !== action.payload.id);
            } else if (action.payload.category === 'music') {
                state.music = state.music.filter((music: any) => music.id !== action.payload.id);
            }
            console.log(state);
        }
    }
});

export const { addTwichVideo, addVideo, addMusic, removeFromPlaylist } = linkSlice.actions;
export default linkSlice.reducer;