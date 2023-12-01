import classes from './Aboutus.module.css'
import Navbar from '../Navbar/Navbar'


const Aboutus = () => {
    return (
        <div className={classes.parentDiv}>
            <div className={classes.overlayDiv}>

            </div>
            <div className={classes.upperDiv}>
                <Navbar></Navbar>
                <div className={classes.parentAboutDiv}>
                    <div className={classes.divCenter}>
                        <p>Bringing Happiness to the faces of needful</p>
                        {'This organization is solely dedicated to using your used goods for the less affluent, by being a mediator for those goods.  We work with organization and volunteers who are simply dedicated to help the poor.  '}
                        <p></p>
                        {`Our Organization (NSS) is specially working in drug de-addiction, plantation and road safety advocacy programs`}
                        <p></p>
                        {'Also working with association with Central ministry of social justice and empowerment and ministry of road transport and highways'}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Aboutus