import { Component } from 'react'
import c from './Modal.module.css'


export class Modal extends Component {

   componentDidMount() {
    window.addEventListener("keydown", this.handlePressEsp )
     
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handlePressEsp )
  }

  handlePressEsp = (e) => {
    if (e.code === "Escape") {
      this.props.onClose()
    }
  }

  handleClickBackdrop = (e) => {

if (e.currentTarget === e.target) {
      this.props.onClose();
    }  }

  render() {
    return <div className={c.Overlay} onClick={this.handleClickBackdrop}>
  <div className={c.Modal} >
    <img src={this.props.src} alt={this.props.discr} />
  </div>
</div>
  }
}
