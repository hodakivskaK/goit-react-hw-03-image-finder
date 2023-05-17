import { Component } from 'react'
import c from './ImageGallery.module.css'
import { Loader } from './Loader';
import { ImageGalleryItem } from './ImageGalleryItem'
import { Button } from './Button';

export class ImageGallery extends Component { 
    state = {
        page: 1,
        per_page: 12,
        error: null,
        status: "idle",
        imgCollection: [],
        totalHits: 0,
    }

    componentDidUpdate(prevProps, prevState) {
        let { page, imgCollection } = this.state;

        if (prevProps.inputSearch !== this.props.inputSearch || prevState.page !== page) {
            this.setState({ status: "pending", imgCollection: [] })
            fetch(`https://pixabay.com/api/?key=36351524-32f9ea6cfc89d6fe5933a5610&q=${this.props.inputSearch}&page=${page}&image_type=photo&orientation=horizontal&per_page=12&id&webformatURL&largeImageURL`)
                .then(res => res.json() )
                .then(gallery => { 
                    this.setState({ status: "resolved", totalHits: gallery.totalHits })
                    if (prevState.page !== page) {
                       return  this.setState({ imgCollection: [...imgCollection, ...gallery.hits] })
                    }
                    if (prevProps.inputSearch !== this.props.inputSearch) {
                       return this.setState({ imgCollection: gallery.hits, page:1 })
                    }
                   
                })
                .catch(error => this.setState({ error, status: "rejected" }))
           
        }      
    }
    
     onNextPage = () => {
        this.setState({ page: this.state.page + 1 })
    };
    

    render() {
        const { imgCollection ,  error, status, totalHits} = this.state;
            
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
                
                {imgCollection.map(img =>
                    <ImageGalleryItem img={img} key={img.id} src={img.webformatURL} alt={img.tags} openImg={this.props.onOpen} />)}
            </ul>
            {totalHits >= 12 && totalHits > imgCollection.length && <Button onConsole={this.onNextPage} />}
            {totalHits < 1 && <h1>We don't have any picture</h1> }
                   
            </div>
             
        }
    }
}