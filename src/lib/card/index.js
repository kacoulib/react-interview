import React, { Component } from 'react';


export default class ListCard extends Component
{
  render()
  {
    let {movies, eventsCard} = this.props;

    return (
      <ul id='card'>
        {
          movies.map((movie, index)=>
          {
            let {id, title, likes, dislikes, liked, category} = movie,
              jauge = (100 * (likes / (likes + dislikes)));

            return (
              <li key={index}>
                  <h2>{title}</h2>
                  <button onClick={()=> eventsCard.removeCard(id)} className='remove'>x</button>
                  <span>{category}</span>
                  <div>
                    <span>{likes +' '+ dislikes}</span>
                    <button onClick={()=> eventsCard.toggleLikes(id)}>{liked ? 'Dislike': 'Like'}</button>
                    <div className='jauge'>
                      <span style={{width: jauge+'%'}}></span>
                    </div>

                  </div>
              </li>
            )
          })
          
        }
      </ul>
    )
  }
}