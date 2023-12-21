import React, { useEffect } from 'react';
import {
  Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb,
  BreadcrumbItem, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDateFormat } from '../hooks/useDateFormat';

const DateFormat = ({ commentDate }) => {
  const { dateFormat } = useDateFormat(commentDate)
  return (dateFormat);
}

const RenderComments = ({ comments }) => {
  if (comments != null) {
    const dishComments = comments.map((comment) => {
      return (
        <ul key={comment.id} className="list-unstyled mb-4">
          <li className="mb-3">{comment.comment}</li>
          <li>-- {comment.author} , <DateFormat commentDate={comment.date} /></li>
        </ul>
      );
    });

    return (
      <div className="col-12 col-md-5 m-1">
        <div>
          <h4>Comments<br /></h4>
          {dishComments}
        </div>
      </div>
    );
  }
  else
    return (
      <div></div>
    );
}

const RenderDish = ({ dish, favorite, favorites, setFavorite, postFavorite }) => {

  useEffect(() => {
    setFavorite(favorites.some((favorite) => favorite.dishId === dish.id))
  }, [])

  if (dish != null)
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" top src={dish.image} alt={dish.name} />
          <CardImgOverlay>
            <Button outline color="primary" onClick={() => favorite ? console.log('Already favorite') : postFavorite(dish.id)}>
              {favorite ?
                <span className="fa fa-heart"></span>
                :
                <span className="fa fa-heart-o"></span>
              }
            </Button>
          </CardImgOverlay>
          <CardBody>
            <CardTitle><h5>{dish.name}</h5></CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  else
    return (
      <div></div>
    );
}

const DishDetail = (props) => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <RenderDish dish={props.dish} favorite={props.favorite} favorites={props.favorites} setFavorite={props.setFavorite} postFavorite={props.postFavorite} />
        <RenderComments comments={props.comments} />
      </div>
    </div>
  );
}

export default DishDetail;