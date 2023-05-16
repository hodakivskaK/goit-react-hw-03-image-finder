import { Component } from 'react'
import c from './ImageGallery.module.css'
import { Loader } from './Loader';
import { ImageGalleryItem } from './ImageGalleryItem'
import { Button } from './Button';

export class ImageGallery extends Component { 
    state = {
        page: 1,
        per_page: 12,
        gallery: [],
        error: null,
        status: "idle",
        imgCollection: [],
        totalHits: 0,
    }

    componentDidUpdate(prevProps, prevState) {
        let { page } = this.state
        if (prevProps.inputSearch !== this.props.inputSearch) {
            this.setState({ status: "pending", gallery: null })
            fetch(`https://pixabay.com/api/?key=36351524-32f9ea6cfc89d6fe5933a5610&q=${this.props.inputSearch}&image_type=photo&orientation=horizontal&per_page=12&id&webformatURL&largeImageURL`)
                .then(res => res.json())
                .then(gallery => { this.setState({ gallery: gallery, status: "resolved", totalHits: gallery.totalHits }) })
                .catch(error => this.setState({ error, status: "rejected" }))
            this.setState({ page: 1 })
        }

        if (prevState.page !== this.state.page) {
             this.setState({ status: "pending", gallery: null })
            fetch(`https://pixabay.com/api/?key=36351524-32f9ea6cfc89d6fe5933a5610&q=${this.props.inputSearch}&image_type=photo&orientation=horizontal&per_page=24&id&webformatURL&largeImageURL&page=${page}`)
                .then(res => res.json())
                .then(gallery => {this.setState({ gallery: gallery, status: "resolved", totalHits: gallery.totalHits }) })
                .catch(error => this.setState({ error, status: "rejected" }))
        
        }


    }
     onNextPage = () => {
   
        this.setState({ page: this.state.page + 1,  per_page: this.state.page + 12, totalHits: this.state.page - 12 })
    
    };
    

    render() {
        const { gallery ,  error, status, totalHits} = this.state;
            
        if (status === "idle") {
              return (<h1>Start search</h1>)
            }

        if(status === "pending"){
               return (<Loader/>)
            }

        if(status === "rejected"){
             return (<h1> {error} </h1>)
            } 

        if (status === "resolved") {
        return  <div>
        <ul className={c.ImageGallery}>
                
                {gallery.hits.map(img =>
                    <ImageGalleryItem img={img} id={img.id} src={img.webformatURL} alt={img.tags} openImg={this.props.onOpen} />)}
            </ul>
            {totalHits >= 12 && <Button onConsole={this.onNextPage} />}
                   
            </div>
             
        }
    }
}