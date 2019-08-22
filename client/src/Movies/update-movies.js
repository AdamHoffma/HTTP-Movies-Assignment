import axios from "axios";
import React, {useState, useEffect} from 'react'

const UpdateMovieForm = props => {
    const blankMovie = {
        title: '',
        director: '',
        metascore: '',
        stars: []
    }
    const [movie, setMovie] = useState(blankMovie)

    useEffect(() => {
        const movieId = props.match.params.id
        axios.get(`http://localhost:5000/api/movies/${movieId}`)
        .then(res => {
            setMovie(res.data)
        })
        .catch(err => console.log('error', err))
    }, [props.match.params.id])

    const changeHandler = e => {
        setMovie({...movie, [e.target.name]: e.target.value})
    }
    const handleSubmit = e => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${movie.id}`)
        .then(res => {
            setMovie(blankMovie)
            props.updateItems(res.data)
            props.history.push('/')
        })
        .catch(err => console.log(err.response))
    }

    return (
        <div>
            <h2>Update</h2>
            <form onsubmit={handleSubmit}>
                <input type="string"
                name="title"
                onChange={changeHandler}
                value={movie.title}
                placeholder="title"
                />
                <input type="string"
                name="director"
                onChange={changeHandler}
                value={movie.director}
                placeholder="director"
                />
                <inpurt type="string"
                name="metascore"
                onChange={changeHandler}
                value={movie.metascore}
                placeholder="metascore"
                />
            </form>
        </div>
    )
}

export default UpdateMovieForm

