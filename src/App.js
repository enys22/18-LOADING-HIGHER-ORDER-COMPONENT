import './App.css';
import React, { Component } from 'react'
import MovieList from './componants/MovieList'
import RatingStars from './componants/RatingStars'
import WithLoading from './HOC/WithLoading'

const ListWithLoading = WithLoading(MovieList)

class App extends Component {
  state = {
    movies: [
      {
        title: "abcd",
        synopsis: "lorem epsum",
        actors: ["actor 1", "actor 2"],
        rating: 5
      },
      {
        title: "efg",
        synopsis: "lorem epsum",
        actors: ["actor 1", "actor 2"],
        rating: 4
      }
    ],
    search: {
      text: '',
      rating: 0
    },
    result: [],
    isLoading : true
  }

  handleSearchChange = (e) => {
    this.setState({ search: { ...this.state.search, text: e.target.value } })
  }
  searchMovie = () => {
      //this.setLoading(true)
      return this.state.movies.filter(el => ( 
        (
          el.title.indexOf(this.state.search.text) !== -1 || 
          el.synopsis.indexOf(this.state.search.text) !== -1 || 
          el.actors.indexOf(this.state.search.text) !== -1 
          ) 
        && (el.rating >= this.state.search.rating) 
        )/*,this.setLoading(false)*/ )
      
    }
  searchRating = (rat) => {
    this.setState({ search: { ...this.state.search, rating: rat } }  );
    this.searchMovie() ;
  }
  addMovie = (newMovie) =>{
    this.setState({ movies: [...this.state.movies,newMovie] })
  }
  setLoading=(isIt)=>{
    this.setState({ isLoading: isIt });
  }

  componentDidMount(){
    //this.setLoading(true)
    setTimeout(()=> this.setLoading(false), 3000);
  }


  render() {
    return (
      <div className="App">
        <div className='header'>

          <div className='searchBar'>
            <input className='inputText' type="text" onChange={this.handleSearchChange} />
            <button className='inputBtn' type="submit" value="Search" onClick={this.searchMovie} >Search</button>
          </div>

          <div className='rating'> 
            <p>Minimum rating</p>
            <RatingStars rating={0} getRating={this.searchRating}/>
          </div>
        </div>

        <h3>{this.state.result.length || this.state.search.rating ? `Result for movies ${this.state.search.text} with minimum ${this.state.search.rating} stars rating` : "Newest movie"}</h3>
        <ListWithLoading movieList={this.searchMovie()} saveMovie={this.addMovie} setLoading={this.setLoading} isLoading={this.state.isLoading}/>
      </div>
    )
  }
}


export default App;
