import mongoose, { Schema } from 'mongoose'
import type { Document, Model } from 'mongoose'

interface Song extends Document {
    _id: string
    trackName: string
    artistName: string
    msPlayed: number
    genre?: string // Default is empty, so it can be optional
    danceability?: number
    energy?: number
    key?: number
    loudness?: number
    mode?: number
    speechiness?: number
    acousticness?: number
    instrumentalness?: number
    liveness?: number
    valence?: number
    tempo?: number
    type?: string
    id?: string
    uri?: string
    track_href?: string
    analysis_url?: string
    duration_ms?: number
    time_signature?: number
    liked?: boolean // Default is false, so it can be optional
    createdAt?: Date // Added because of timestamps
    updatedAt?: Date // Added because of timestamps
}

export type SongDocument = Song & Document

const SongSchema: Schema<Song> = new Schema(
    {
        trackName: { type: String, required: true },
        artistName: { type: String, required: true },
        msPlayed: { type: Number, required: true },
        genre: { type: String, default: '' },
        danceability: { type: Number },
        energy: { type: Number },
        key: { type: Number },
        loudness: { type: Number },
        mode: { type: Number },
        speechiness: { type: Number },
        acousticness: { type: Number },
        instrumentalness: { type: Number },
        liveness: { type: Number },
        valence: { type: Number },
        tempo: { type: Number },
        type: { type: String },
        id: { type: String },
        uri: { type: String },
        track_href: { type: String },
        analysis_url: { type: String },
        duration_ms: { type: Number },
        time_signature: { type: Number },
        liked: { type: Boolean, default: false },
    },
    { timestamps: true }
)

// Use mongoose.modelNames() to check if 'Song' model exists
const modelName = 'Song'

const Song: Model<Song> = mongoose.models[modelName] || mongoose.model<Song>(modelName, SongSchema)

export default Song
