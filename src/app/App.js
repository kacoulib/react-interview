import React, { Component } from 'react';
import './App.css';
import  { movies$ } from '../mock/movies';
import  ListCard from '../lib/card';
import  Paginate from '../lib/paginate';

class App extends Component
{
  constructor(props)
  {
    super(props);

    this.state = 
    {
      movies : [],
      defaultMovies : [],
      currentPage: 1,
      pageLimit: 4,
      pageLimitList: [4, 8, 12],
      categoryList: [],
      selectedCategory: []
    }
  }

  componentDidMount()
  {
    
    movies$.then(movies =>
    {
      let categoryList = this.getCategoryList(movies);

      this.setState({movies, defaultMovies: movies, categoryList}, () => this.paginateTo(1))
    })
  }

  visibleElements = () => this.state.defaultMovies.filter(elem => !elem.disabled)

  resetCategories = () => this.state.defaultMovies.map(elem => elem.disabled = false)

  getCategoryList = (movies = []) =>
  {
    let categoryList = [],
      movie;

    for (let index = 0; index < movies.length; index++)
    {
      movie = movies[index];
      if (categoryList.indexOf(movie.category) < 0)
        categoryList.push(movie.category)
    }

    return categoryList;
  }

  paginateTo = (pageNumber) =>
  {
    let {pageLimit, movies, currentPage} = this.state,
      tmp,
      visibleElements = this.visibleElements();

    currentPage = pageNumber;
    tmp = pageLimit * currentPage;
    movies = visibleElements.slice(tmp - pageLimit, tmp);
    
    this.setState({movies, currentPage});
  }

  removeCard = (id) =>
  {
    let {defaultMovies, pageLimit, currentPage, selectedCategory} = this.state,
      maxPage = currentPage,
      updateState = {};

    updateState.defaultMovies = defaultMovies.filter((movie) => (movie.id !== id))
    maxPage = Math.ceil(updateState.defaultMovies.length / pageLimit);
    updateState.currentPage = (maxPage <= currentPage) ? maxPage: currentPage;

    updateState.categoryList = this.getCategoryList(updateState.defaultMovies);
    updateState.selectedCategory = updateState.categoryList.filter(cat => selectedCategory.indexOf(cat) > -1)

    this.setState(updateState, () =>
    {
      if (!updateState.selectedCategory.length && selectedCategory.length)
        this.resetCategories();

      this.paginateTo(updateState.currentPage)
    })
  }

  toggleLikes = (id) =>
  {
    let {movies} = this.state,
        movie,
        index;

    for (index = 0; index < movies.length; index++)
    {
      movie = movies[index];
      if (movie.id === id)
      {
        movie.liked = !movie.liked;
        if (movie.liked)
        {
          movie.likes++;
          movie.disliked--;
        }
        else
        {
          movie.disliked++;
          movie.likes--;
        }
      }
    }
  
    this.setState({movies});
  }

  eventCategory = (category) =>
  {
    let {defaultMovies, selectedCategory} = this.state,
      index = selectedCategory.indexOf(category);

    if (index > -1)
      selectedCategory.splice(index, 1);
    else
      selectedCategory.push(category);

    for (let index = 0; index < defaultMovies.length; index++)
      defaultMovies[index].disabled = (selectedCategory.indexOf(defaultMovies[index].category) < 0);
    
    this.setState({defaultMovies, selectedCategory}, () => this.paginateTo(1));
  }

  render()
  {
    let {movies, pageLimit, pageLimitList, currentPage, categoryList} = this.state,
      visibleElements = this.visibleElements();

    return (
      <div>
        <header>
          <ul>
            {
              pageLimitList.map((elem, index) =>
              {
                return (
                  <li key={index} onClick={() => this.setState({pageLimit: elem}, () => this.paginateTo(1)) }>
                    {elem}
                  </li>
                )
              })
            }
          </ul>
          <ul>
            {
              categoryList.map((elem, index) =>
              {
                return (
                  <li key={index} onClick={() => this.eventCategory(elem)} >
                    {elem}
                  </li>
                )
              })
            }
          </ul>
        </header>
        <ListCard movies={movies} eventsCard={{removeCard: this.removeCard, toggleLikes: this.toggleLikes}}/>
        <footer>
          <Paginate tools={{currentPage,  dataLength: visibleElements.length, pageLimit}} eventsCard={{pagianteTo: this.paginateTo}}/>
        </footer>
      </div>
    );
  }
}


export default App;
