import classes from './ContactUs.module.css'
import Navbar from '../Navbar/Navbar'

const ContactUs = () => {
    return (
        <div className={classes.parentDiv}>
            <div className={classes.overlayDiv}></div>
            <div className={classes.upperDiv}>
            <Navbar></Navbar>
                <div className={classes.contactDiv}>
                    <div className={classes.contactChildDiv}>
                        <p>{'Need a hand, want to know more about our organization. Contact us from information provided'}</p>
                        <div className={classes.informationDiv}>
                            <p>Registered address - Narayan sewa samiti, 59 B Block, Behind Hanuman mandir, Raisinghnagar,PIN 335051</p>
                            <p>Mobile number - 9414091144</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs