/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useEffect, useState } from "react";

const Exercise02 = () => {

	const [movies, setMovies] = useState([])
	const [genres, setGenres] = useState([])
	const [fetchCount, setFetchCount] = useState(0)
	const [loading, setLoading] = useState(true)

	const handleMovieFetch = () => {
		setFetchCount(fetchCount + 1)
		//console.log('Getting movies')
		fetch('http://localhost:3001/movies?_limit=50')
			.then(res => res.json())
			.then(json => {
				setMovies(json)
				setFetchCount(0)
				setLoading(false)
			})
		.catch(() => {
			console.log('Run yarn movie-api for fake api')
		})
	}


	const handleGenresFetch = () => {
		fetch('http://localhost:3001/genres')
			.then(res => res.json())
			.then(json => {
				setGenres(json)
			})
		.catch(() => {
			console.log('Run yarn movie-api for fake api')
		})
	}

	const selectCategory = (e) => {
		if(e.target.value === '') {
			alert ("Please select a category");
			return false;
		}
		fetch('http://localhost:3001/movies?_limit=50&genres='+e.target.value)
			.then(res => res.json())
			.then(json => {
				setMovies(json)
			})
		.catch(() => {
			console.log('Run yarn movie-api for fake api')
		})
	}
	
	const oderMovie = (e) => {
		if(e === '') {
			alert ("Please select a order");
			return false;
		}

		if(e === "ASC") {
			const listAsc = [...movies].sort((a, b) => (a.year > b.year ? 1 : a.year < b.year ? -1 : 0))
			setMovies(listAsc)
		} else {
			const listAsc = [...movies].sort((b, a) => (a.year > b.year ? 1 : a.year < b.year ? -1 : 0))
			setMovies(listAsc)
		}
	}


	useEffect(() => {
		handleMovieFetch()
		handleGenresFetch()
	}, [])

	return (
		<>
				<div className="header-movie-library"></div>
			<section className="movie-library">
				<div className="movie-container">
					<h1 className="movie-library__title">
						Movie Library
					</h1>
					<div className="">
						
						<div class="row">
							<div className="col-md-12">
								
							<div className="input-group mb-3">
								<select className="form-control" name="genre" onChange={(e) => selectCategory(e)} required placeholder="Search by genre...">
									<option value="">Select Category</option>
									{genres.map((item) =>
									(<option value={item} key={item}>{item}</option>)
									)}
								</select>
								<button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Select Order</button>
								<ul className="dropdown-menu dropdown-menu-end">
									<li><div className="dropdown-item" onClick={() => oderMovie('ASC')}>Year Ascending</div></li>
									<li><hr className="dropdown-divider" /></li>
									<li><div className="dropdown-item" onClick={() => oderMovie('DESC')}>Year Descending</div></li>
								</ul>
							</div>



							</div>
						</div>
					</div>
					{loading ? (
						<div className="movie-library__loading">
						<p>Loading...</p>
						<p>Fetched {fetchCount} times</p>
						</div>
					) : (
						<div>
							<br></br>
							<div className="row">
							{movies.map(movie => (
								<div className="col-12 col-md-3 mb-2" key={movie.id}>
									<div className="card">
										<img src={movie.posterUrl} alt={movie.title} className="card-img-top card-img" />
										<div className="card-body">
											<ul>
												<li><b>{movie.title}</b></li>
												<li>Year: {movie.year}</li>
												<li>Runtime: {movie.runtime}</li>
												<li>Genres: {movie.genres.join(', ')}</li>
											</ul>
										</div>
									</div>

								</div>
							))}
							</div>
						</div>
					)}
				</div>
			</section>
		</>
	)
}

export default Exercise02