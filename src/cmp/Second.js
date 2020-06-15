import React from 'react';
import { Button, Jumbotron, Form, Row, Col, ListGroup, ListGroupItem, Card } from 'react-bootstrap';

class Second extends React.Component{
    constructor(props) {
        super();
        this.state = {
            moviesList:[],
            movieName:'',
            releaseDate:'',
        }
    }

    searchMovies(){
        console.log("Search Mothode: ", this.state);
        // let url = 'http://www.omdbapi.com/?s=x men&y=2000&apikey=f22d1b77'
        let url = 'http://www.omdbapi.com/?s='+this.state.movieName+'&y='+this.state.releaseDate+'&apikey=f22d1b77'
        fetch(url, {
            method: "GET",
        }).then((res => {
            res.json().then((data) => {
                console.log("response", data);
                this.setState({
                    moviesList: data.Search
                })
            })
        }))
    }

    render() {
        return (
            <div>
                {/* <Model /> */}
                <Jumbotron>
                    <Form>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>Movie title</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="X-Man" 
                                        onChange={(e)=>{this.setState({movieName:e.target.value})}}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>Movie release year</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        onChange={(e)=>{this.setState({releaseDate:e.target.value})}}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Button variant="primary" onClick={()=>this.searchMovies()}>
                            Search
                        </Button>
                    </Form>
                    <Form.Group></Form.Group>

                    {
                        this.state.moviesList.length > 0 ?
                            this.state.moviesList.map((item, i)=>
                                <Card style={{ width: '15rem' }} key={i+1}>
                                    <Card.Img variant="top" src={item.Poster} />
                                    <Card.Body>
                                        <Card.Title>{item.Title}</Card.Title>
                                        <Card.Text>
                                            {item.Title}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )
                            
                        : null
                    }
                </Jumbotron>
                    
               
            </div>
        )
    }
}

export default Second;