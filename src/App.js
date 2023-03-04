import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MovieCard } from "./components/MovieCard/MovieCard";
import { api_url, api_search, api_genre, api_withgenre } from './API/api_base';
import { Modal } from "./components/Modal/Modal.jsx";


function App() {

  const [movies, setMovies] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [currentGenre, setCurrentGenre] = useState("");

  const getGenre = async ()=>{
    const genres = await axios.get(api_genre);
    setGenreList(genres.data.genres);
  }

  const getMovies = async ()=>{
    try{
      const { data } = await axios.get(api_url)
      setMovies(data.results);
    }catch(err){
      console.log(err);
    }
  }

  const searchItem = async (q)=>{
    try{
      if(q.length===0) getMovies();

      setTimeout(async () => {
        setsearchQuery(q.toLowerCase());
        var search_result = await axios.get(api_search+q);
        setMovies(search_result.data.results);
      }, 2000);

      
    }catch(err){
      console.log(err);
    }
  }

  var handleGenre = async(gen_id, gen_name)=>{
    var genre_res = await axios.get(api_withgenre+gen_id);
    setMovies(genre_res.data.results);
    setCurrentGenre(gen_name);
  }

  useEffect(()=>{
    getMovies();
    getGenre();
  }, [])



  return (
    <div className="App">
       <div className="header">
          <h1 className='heading-1'>Movies Time</h1>
          <div className="search">
            <input type="search" name='search-item' onChange={(e)=>{searchItem(e.target.value)}} placeholder='search...' className='search-bar'/>
          </div>
       </div>

       <div className="genres">
              {
                genreList && genreList.length>0 && genreList.map(gen => 
                  <button type="button" key={gen.id} onClick={() => {handleGenre(gen.id, gen.name)}} className="btn btn-danger">{gen.name}</button>
                )
              }
       </div>

       <div className="heading">
          <h4>{currentGenre || "Trending"} Movies</h4>
       </div>

       <div className="modal-sec">
          <Modal />
       </div>

       <div className="main">
          {movies && movies.length>0 && movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
       </div>
    </div>
  );
}

export default App;
