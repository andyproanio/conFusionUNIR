import React from 'react';
import { Media, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const RenderMenuItem = ({ dish, deleteFavorite }) => {
  return (
    <Media tag="li">
      <Media left middle>
        <Media object src={dish.image} alt={dish.name} />
      </Media>
      <Media body className="ml-5">
        <Media heading>{dish.name}</Media>
        <p>{dish.description}</p>
        <Button outline color="danger" onClick={() => deleteFavorite(dish.id)}>
          <span className="fa fa-times"></span>
        </Button>
      </Media>
    </Media>
  );
}

const Favorites = (props) => {

  if (localStorage.getItem('favorites')) {
    props.setFavorites(JSON.parse(localStorage.getItem('favorites')))
    localStorage.clear()
  }

  if (props.favorites.length > 0) {

    const favorites = props.favorites.map((favorite) => {

      let dish = props.dishes.filter((dish) => dish.id === favorite.dishId)[0];
      return (
        <div key={dish.id} className="col-12 mt-5">
          <RenderMenuItem dish={dish} deleteFavorite={props.deleteFavorite} />
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
            <BreadcrumbItem active>Favorites</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Favorites</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <Media list>
            {favorites}
          </Media>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="container">
        <div className="row">
          <h4>You don't have favorites</h4>
        </div>
      </div>
    )
  }
}

export default Favorites







