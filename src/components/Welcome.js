import "../App.css";
import { AiFillGift } from 'react-icons/ai'

const Welcome = () => {

    return (
        <div className="welcome-box">
            <div className="welcome-icon">
                <AiFillGift className='gift-icon' size={'20em'} id="state1"/>
                <AiFillGift className='gift-icon' size={'6em'} id="state2"/>
            </div>
            <div className="welcome-container">
                <h1 className="bigTitle">WSHLST</h1>
            </div>
            <div className="title-box">
                <h3 className="smallTitle">GIFTS MINUS THE GUESSWORK</h3>
                <h4 className="smallestTitle">LOGIN TO CONTINUE</h4>
            </div>
        </div>
    )

}

export default Welcome