import { Component } from 'react'
// import axios from "axios";
import c from './App.module.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from "./Searchbar";
// import { Loader } from './Loader';
import {ImageGallery} from './ImageGallery'
import { Modal } from "./Modal";
// import { keyboard } from '@testing-library/user-event/dist/keyboard';
 

export class App extends Component {
  state = {
    inputSearch: "",
    window: false,
    largeImg: '',
    alt: '',
  }


  handleFormSubmit = (searchName) => {
    this.setState({inputSearch: searchName});
  }

  handleToggle = () => {
     this.setState(({ window }) => ({
      window: !window,
     }))
  }


  handleClick = img => {
    this.setState({ largeImg: img.largeImageURL });
    this.setState({alt: img.tags});
    this.handleToggle();
  };


  render() {
      const { inputSearch, window, largeImg, alt } = this.state;

    return (
      <div className={c.App} >
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery inputSearch={inputSearch} onOpen={this.handleClick}  /> 
        
        {window && <Modal src={largeImg} discr={alt} onClose={this.handleToggle} />}
        <ToastContainer autoClose={1000} />
        
    </div>
  );
  }
  
};
