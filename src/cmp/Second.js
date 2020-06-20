import React from 'react';
import { Button, Jumbotron, Form, Row, Col, ListGroup, ListGroupItem, Card } from 'react-bootstrap';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Second extends React.Component{
    constructor(props) {
        super();
        this.state = {
            moviesList:[],
            movieName:'',
            releaseDate:'',
            firstTime:false
        }
    }

    componentDidMount(){
        if(this.props.actionList.length > 0){
            this.setState({
                moviesList: this.props.actionList,
                firstTime: true
            });
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
                if(data.Response == "True"){
                    console.log("API Data")
                    this.setState({
                        moviesList: data.Search,
                        firstTime: true
                    });
                    this.props.secondActionList(data.Search);
                } else {
                    this.setState({
                        moviesList: [],
                        firstTime: true
                    });
                }
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
                        this.state.firstTime ? 
                            <Row>
                                {
                                    this.state.moviesList.length > 0 ?
                                        this.state.moviesList.map((item, i) =>
                                            <Col key={i+1} style={{textAlign:"center", marginTop:"10px"}} lg={3} sm={4}>
                                                <Card style={{ width: '15rem' }}>
                                                    <Card.Img variant="top" src={item.Poster} />
                                                    <Card.Body>
                                                        <Card.Title>{item.Title}</Card.Title>
                                                        <Card.Text>
                                                            <p>Title: {item.Title}</p>
                                                            <p>Release Year: {item.Year}</p>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )
                                        
                                    : 
                                        <p> Record not found </p>
                                }
                            </Row>
                        : null
                    }
                    
                </Jumbotron>
            </div>
        )
    }
}

// Dispatch the actions
const mapDispatchToProps = dispatch => ({
    secondActionList: (data) => dispatch(actions.secondMoviesList(data))
})

// Get state data from store
const mapStateToProps = state =>({
    actionList: state.secondMoviesList
})

export default connect(mapStateToProps, mapDispatchToProps)(Second);