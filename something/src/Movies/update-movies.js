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
    console.log('blank', blankMovie)

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
        axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
        .then(res => {
            setMovie(blankMovie)            
            props.history.push('/')
        })
        .catch(err => console.log(err.response))
    }

    const handleStar = index => e => {
        setMovie({...movie, stars: movie.stars.map((star, starIndex) => {
            if (starIndex === index) {
                return e.target.value
            } else {
                return star
            }
        })})
    }

    return (
        <div>
            <h2>Update</h2>
            <form onsubmit={handleSubmit}>
                <input type="text"
                name="title"
                onChange={changeHandler}
                value={movie.title}
                placeholder="title"
                />
                 <input type="text"
                name="director"
                onChange={changeHandler}
                value={movie.director}
                placeholder="director"
                />
                <inpurt type="text"
                name="metascore"
                onChange={changeHandler}
                value={movie.metascore}
                placeholder="metascore"
                />
                {movie.stars.map((starName, index) => {
                    return <input type='text'
                    placeholder="star"
                    value={starName}
                    key={index}
                    onChange={handleStar(index)}/>
                
                })}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UpdateMovieForm

