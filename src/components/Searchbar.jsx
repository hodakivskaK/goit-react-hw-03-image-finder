import { Component } from 'react'
import c from './Searchbar.module.css'
import { toast } from 'react-toastify';
import { FaSearch } from "react-icons/fa";

export class Searchbar extends Component { 
    state = {
        nameSearch: "",
    }

    handleInput= (e) => {
        this.setState({nameSearch: e.currentTarget.value.toLowerCase(),})
    
  }
  
    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.nameSearch.trim() === '') {
            return toast.warn("Please write something")
        }

        this.props.onSubmit(this.state.nameSearch);
        this.setState({ nameSearch: "", })
        e.currentTarget.reset()
    }
    
    
    render() {

    return (<header className={c.Searchbar}>
    <form className={c.SearchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={c.SearchFormButton}>
                <span className="button-label">
                <h3>
     <FaSearch />
    </h3>

                </span> 
    </button>

    <input
      className={c.SearchFormInput}
      type="text"
      autoComplete="off"
      autoFocus
    placeholder="Search images and photos"
    onChange={this.handleInput}
    />
        </form>
    
    </header>)
    }
}

