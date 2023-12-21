import React from 'react'
import { Breadcrumb, BreadcrumbItem, Button, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

const Search = () => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
          <BreadcrumbItem active>Search Dish</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Search Dish</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <FormGroup className='col-6'>
          <Input type="search" placeholder='Search' className='col-12'></Input>
        </FormGroup>
        <span className="icon">🔍</span>
      </div>
    </div>
  )
}

export default Search







