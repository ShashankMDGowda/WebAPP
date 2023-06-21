import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Card from 'react-bootstrap/Card';
import './Home.css'
import { Link } from 'react-router-dom';

const Home = () => {

    const[movie,setMovie]=useState([])
    const[query,setQuery] = useState('')
    const[open,setOpen]=useState(false)

    const toggle = ()=>{
      setOpen(!open)
    }


    
  const SearchMovies = async(e)=>{
    e.preventDefault()
    console.log("search");
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=ab1da08307f82007e9975d4dccf67670&query=${query}`
      const res = await fetch(url)
      const data= await res.json()
      setMovie(data.results)
    } 
    catch (error) {
      console.log("Error");
    }
  }

  const ChangeHandler = (e)=>{
    setQuery(e.target.value)
  } 

  useEffect(()=>{
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=ab1da08307f82007e9975d4dccf67670&language=en-US&page=1')
    .then((res)=>res.json())
    .then(data=>setMovie(data.results))
},[])

  return (
    <div className='Home'>

    <Navbar bg="secondary" expand="lg">
    <Container fluid>
      <Navbar.Brand href="#" style={{color:'red',background:'black',borderRadius:'30px'}}>NETFLIX</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
        <Nav.Link>  <Link to='/' style={{color:'wheat',textDecoration:'none'}}>Home</Link></Nav.Link>
        <Nav.Link> <Link to='/tvshow' style={{color:'wheat',textDecoration:'none'}}>Tvshow</Link></Nav.Link>
         <Nav.Link> <Link to='/upcoming' style={{color:'wheat',textDecoration:'none'}}>Upcoming</Link></Nav.Link>
         <Nav.Link> <Link to='/ontv' style={{color:'wheat',textDecoration:'none'}}>On Tv</Link></Nav.Link>
         <Nav.Link> <Link to='/ongoing' style={{color:'wheat',textDecoration:'none'}}>Top Rated</Link></Nav.Link>
        </Nav>
        <Form className="d-flex" onSubmit={SearchMovies}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={query} 
            onChange={ChangeHandler}
          />
          <Button variant="outline-success" type="submit">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
 
  <Carousel>
  {movie && movie.map((item)=>{
    return(
        <header className='Homeheader' style={{height:'700px'}}>
        <div className='headerdiv'>
        <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt=''></img>
        <p className="legend">
        <h1>{item.original_title}</h1>
        <p>{item.overview}</p>
        <p>{item.vote_average}<i class="fa-solid fa-star" style={{color:'yellow'}}></i></p>
        </p>
        </div>
        </header>
    )
  })}
</Carousel>


<section className='cardsec'>
{movie && movie.map((item)=>{
    return(
        <Card style={{ width: '18rem' }}>
<Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} />
<Card.Body>
  <Card.Title>{item.original_title}</Card.Title>
  <Button variant="primary" onClick={toggle}>Read More</Button>
  {open && (
    <Card.Text>
   {item.overview}
  </Card.Text>
  )}
</Card.Body>
</Card>
    )
})}
</section>



    </div>
  )
}

export default Home