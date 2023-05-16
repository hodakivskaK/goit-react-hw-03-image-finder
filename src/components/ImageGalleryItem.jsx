import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';


export const ImageGalleryItem = ({ img, id, src, alt, openImg }) => {
    return <li key={id} onClick={() => { openImg(img)}}  className={s.ImageGalleryItem}>
        <img src={src} alt={alt} className={s.ImageGalleryItemImage}/>
    </li>
}



ImageGalleryItem.propTypes = {
    img: PropTypes.object,
    id: PropTypes.number,
    src: PropTypes.string,
    alt: PropTypes.string,
    openImg: PropTypes.func
};