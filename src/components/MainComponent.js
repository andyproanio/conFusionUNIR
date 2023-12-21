import React, { useState, useEffect } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishDetailComponent';
import Search from './SearchComponent';
import Favorite from './FavoritesComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

const Main = () => {

  const [dishes, setDishes] = useState([])
  const [comments, setComments] = useState([])
  const [promotions, setPromotions] = useState([])
  const [leaders, setLeaders] = useState([])
  const [favorites, setFavorites] = useState([])
  const [favorite, setFavorite] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    setDishes(DISHES)
    setComments(COMMENTS)
    setPromotions(PROMOTIONS)
    setLeaders(LEADERS)
  }, [])

  const postFavorite = (idFavorite) => {
    favorites.push({ id: favorites.length, dishId: idFavorite })
    setFavorites(favorites)
    setFavorite(true)
  }

  const deleteFavorite = (id) => {
    const favorite = favorites.filter((favorite) => favorite.dishId === id)[0]
    favorites.splice(favorite.id, 1)
    for (var i = favorite.id; i < favorites.length; i++) {
      favorites[i].id = i
    }
    setFavorites(favorites);
    localStorage.setItem('favorites', JSON.stringify(favorites))
    navigate("/favorite");
  }

  const HomePage = () => {
    return (
      <Home
        dish={dishes.filter((dish) => dish.featured)[0]}
        promotion={promotions.filter((promo) => promo.featured)[0]}
        leader={leaders.filter((leader) => leader.featured)[0]}
      />
    );
  }

  const DishWithId = () => {

    const { dishId } = useParams();

    return (
      <DishDetail dish={dishes.filter((dish) => dish.id === parseInt(dishId, 10))[0]}
        comments={comments.filter((comment) => comment.dishId === parseInt(dishId, 10))}
        favorite={favorite}
        favorites={favorites}
        setFavorite={setFavorite}
        postFavorite={postFavorite} />
    );
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/aboutus' element={<About leaders={leaders} />} />
        <Route path='/menu' element={<Menu dishes={dishes} />} />
        <Route path='/search' element={<Search />} />
        <Route path='/favorite' element={<Favorite favorites={favorites} setFavorites={setFavorites} dishes={dishes} deleteFavorite={deleteFavorite} />} />
        <Route path='/contactus' element={<Contact />} />
        <Route path='/menu/:dishId' element={<DishWithId />} />
        <Route path='*' element={<Navigate to="/home" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Main;