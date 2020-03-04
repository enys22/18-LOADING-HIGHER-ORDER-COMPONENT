import React from 'react'
import Movie from './Movie'
import './MovieList.css'
import AddMovie from './AddMovie'
import WithLoading from '../HOC/WithLoading'

// const ListWithLoading = WithLoading(Movie)

function MovieList(props) {
    return (
        <div className='moviesList'>
            {props.movieList.map((movieItem,i) =>
                <>
                {/* <ListWithLoading movie={movieItem} key={i} setLoading={props.setLoading}  isLoading={props.isLoading} /> */}
                <Movie movie={movieItem} key={i}/>
                </>
            )}
            <div className="movieCard">
                <AddMovie saveMovie={props.saveMovie}/>
            </div>
        </div>
    )
}
export default MovieList;