import "../App.css";
import { AiFillGift } from 'react-icons/ai'

const Welcome = () => {

    return (
        <div className="welcome-box">
            <div className="icon">
                <AiFillGift className='gift-icon' size={'20em'} />
            </div>
            <div className="welcome-container">
                <h1 className="bigTitle">WSHLST</h1>
                <h3 className="smallTitle">The wishlist app</h3>
                <h4 className="smallestTitle">Login to continue</h4>
            </div>
        </div>
    )

}

export default Welcome