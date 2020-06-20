import React from 'react';
import { Button, Jumbotron, Form, Row, Col, Table, Modal, Card } from 'react-bootstrap';
import Model from './Model';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as actions from '../actions';
import { connect } from 'react-redux';

class First extends React.Component {
    constructor() {
        super();
        this.state = {
            moviesList: [],
            movieName: '',
            releaseDate: '',
            show: false,
            movieDetails: null,
            firstTime: false
        }
    }

    componentDidMount() {
        if (this.props.actionList.length > 0) {
            this.setState({
                moviesList: this.props.actionList,
                firstTime: true
            });
        }
    }

    searchMovies() {
        console.log("State data: ", this.props.actionList);
        console.log("Search Mothode: ", this.state);
        // let url = 'http://www.omdbapi.com/?s=x men&y=2000&apikey=f22d1b77'
        let url = 'http://www.omdbapi.com/?s=' + this.state.movieName + '&y=' + this.state.releaseDate + '&apikey=f22d1b77'
        fetch(url, {
            method: "GET",
        }).then((res => {
            res.json().then((data) => {
                console.log("response", data);
                if (data.Response == "True") {
                    console.log("API Data")
                    this.setState({
                        moviesList: data.Search,
                        firstTime: true
                    });
                    this.props.firstActionList(data.Search);
                } else {
                    this.setState({
                        moviesList: [],
                        firstTime: true
                    });
                }
            })
        }))
    }

    handleClose(id) {
        this.setState({
            show: !this.state.show
        });

        if (id != 0) {
            let url = 'http://www.omdbapi.com/?i=' + id + '&plot=full&apikey=f22d1b77';
            fetch(url, {
                method: "GET"
            }).then((res => {
                res.json().then((data) => {
                    console.log("response", data)
                    if (data) {
                        this.setState({
                            movieDetails: data
                        })
                    }
                })
            }))
        } else {
            this.setState({
                movieDetails: null
            })
        }
    }

    render() {
        console.log("State data: ", this.props)
        return (
            <div>
                {/* <Model /> */}
                <Jumbotron>
                    {/* <Form> */}
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Movie title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="X-Man"
                                    onChange={(e) => { this.setState({ movieName: e.target.value }) }}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Movie release year</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => { this.setState({ releaseDate: e.target.value }) }}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Button variant="primary" onClick={() => this.searchMovies()}>
                        Search
                        </Button>
                    {/* </Form> */}
                    <Form.Group></Form.Group>

                    {
                        this.state.firstTime ?
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>S.NO.</th>
                                        <th>Title</th>
                                        <th>Year</th>
                                        <th>More</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.moviesList.length > 0 ?
                                            this.state.moviesList.map((item, i) =>
                                                <tr key={i + 1}>
                                                    <td>{i + 1}</td>
                                                    <td>{item.Title}</td>
                                                    <td>{item.Year}</td>
                                                    <td>
                                                        <Button variant="info" size="sm" onClick={() => this.handleClose(item.imdbID)}>More Info</Button>
                                                    </td>
                                                </tr>

                                            )

                                            :
                                            <tr>
                                                <td colSpan="4">No Movies Found</td>
                                            </tr>
                                    }

                                </tbody>
                            </Table>
                            : null
                    }
                </Jumbotron>

                {
                    this.state.movieDetails != null ?

                        <Modal
                            show={this.state.show}
                            onHide={() => this.handleClose(0)}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>{this.state.movieDetails.Title}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Card style={{ width: '100%' }}>
                                    <Card.Body>
                                        <Card.Title>{this.state.movieDetails.Title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Director: {this.state.movieDetails.Director}</Card.Subtitle>
                                        <Card.Subtitle className="mb-2 text-muted">Writer: {this.state.movieDetails.Writer}</Card.Subtitle>
                                        <Card.Subtitle className="mb-2 text-muted">Actors: {this.state.movieDetails.Actors}</Card.Subtitle>
                                        <Card.Subtitle className="mb-2 text-muted">Boxoffice: {this.state.movieDetails.imdbRating > 7 ? "Hit" : "Flop"}</Card.Subtitle>
                                        <Card.Text>
                                            Plot: {this.state.movieDetails.Plot}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.handleClose(0)}>
                                    Close
                            </Button>
                                <Button variant="primary" onClick={() => this.handleClose(0)}>Understood</Button>
                            </Modal.Footer>
                        </Modal>
                        : null
                }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    firstActionList: (data) => dispatch(actions.firstMoviesList(data))
})

const mapStateToProps = state => ({
    actionList: state.firstMoviesList
})
export default connect(mapStateToProps, mapDispatchToProps)(First);