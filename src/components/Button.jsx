import PropTypes from 'prop-types';
import c from './Button.module.css'


export const Button = ({onConsole}) => {
    
    return <button type="button" className={c.Button} onClick={onConsole} >Load more</button>
}


Button.propTypes = {
    onConsole: PropTypes.func
};