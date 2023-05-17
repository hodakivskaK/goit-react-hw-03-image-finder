import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';


export const ImageGalleryItem = ({ img,  src, alt, openImg }) => {
    return <li  onClick={() => { openImg(img)}}  className={s.ImageGalleryItem}>
        <img src={src} alt={alt} className={s.ImageGalleryItemImage}/>
    </li>
}



ImageGalleryItem.propTypes = {
    img: PropTypes.object,
    src: PropTypes.string,
    alt: PropTypes.string,
    openImg: PropTypes.func
};