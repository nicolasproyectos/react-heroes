import React, { useMemo } from 'react';
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import  queryString from 'query-string';
import { getHeroesByName } from '../selector/getHeroesByName';

export const SearchScreen = ( {history}) => {

    const {search} = useLocation();
    const { q = '' } = queryString.parse(search);
    
    const [ formValues, handleInputChange] = useForm({
        searchText: q
    });
    
    const { searchText } = formValues;
    
    const handleSearch = (e) =>{
        e.preventDefault();
        history.push(`?q=${ searchText}`);
    }

    const heroesFiltered = useMemo(() =>
        getHeroesByName(q) , [q]);
    
    
    return (
        <div>
            <h1>Search</h1>
            <hr/>

            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr/>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={searchText}
                            onChange={handleInputChange}
                        />
                        <button
                            type=""
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    
                    <h4>Results</h4>
                    <hr/>
                    {   (q === '') 
                        && <div className="alert alert-info">
                            Search a hero
                        </div>
                    }
                    {   (q !== '' && heroesFiltered.length === 0) 
                        && <div className="alert alert-danger">
                            There is not a hero with { q }
                        </div>
                    }
                    {
                        heroesFiltered.map( hero =>(
                            <HeroCard
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
