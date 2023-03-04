import React from 'react'
import { api_img } from '../../API/api_base';
import { Modal } from '../Modal/Modal';
import '../MovieCard/MovieCard.css';

export const MovieCard = ({movie}) => {
  var {title, poster_path, vote_average} = movie;

  return (
    <div className="card movie-card" style={{'width': '18rem', 'color': 'black'}}>
        <img src={api_img+poster_path} className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{title || "Title Not Available"}</h5>
            <p className="card-text">Rating: {vote_average}</p>
            <a href="#" className="btn btn-primary movie-card-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">View Details</a>
        </div>   

    </div>
  )
}