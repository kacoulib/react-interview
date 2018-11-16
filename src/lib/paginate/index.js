import React, { Component } from 'react';


export default class Paginate extends Component
{
  render()
  {
    let {tools, eventsCard} = this.props,
        {currentPage, dataLength, pageLimit} = tools,
      nb = Math.ceil(dataLength / pageLimit),
      pages = [];

      for (let index = 0; index < nb; index++)
        pages.push(<List key={index} index={parseInt(index + 1)} eventsCard={eventsCard} />);

      return (
        <div>
          {<button onClick={()=> eventsCard.pagianteTo(++currentPage)} disabled={currentPage >= nb}>Next</button>}

          {pages}

          {<button onClick={()=> eventsCard.pagianteTo(--currentPage)} disabled={currentPage <= 1}>Prev</button>}
      </div>
    );
  }
}

class List extends Component
{
  render()
  {
    let {index, eventsCard} = this.props;
    
    return (
      <li onClick={()=>eventsCard.pagianteTo(index)} style={listStyle}>{index}</li>
      );
    }
  }
  
  const listStyle =
  {
    display: 'inline-block',
    padding: 10,
    cursor: 'pointer'
  }