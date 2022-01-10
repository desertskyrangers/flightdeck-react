import {faBan, faBars, faAngleUp, faEllipsisH, faHelicopter, faHome, faPlane, faSpinner, faTimesCircle, faUser} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DroneIcon from "./icon/DroneIcon";

class Icons {

	ADVANCED = <FontAwesomeIcon icon={faEllipsisH}/>
	BARS = <FontAwesomeIcon icon={faBars}/>
	CLOSE = <FontAwesomeIcon icon={faTimesCircle}/>
	COLLAPSE_UP = <FontAwesomeIcon icon={faAngleUp}/>
	DRONE = <DroneIcon/>
	HELICOPTER = <FontAwesomeIcon icon={faHelicopter}/>
	HOME = <FontAwesomeIcon icon={faHome}/>
	NO_RESULT = <FontAwesomeIcon icon={faBan}/>
	PLANE = <FontAwesomeIcon icon={faPlane}/>
	USER = <FontAwesomeIcon icon={faUser}/>
	WAIT = <FontAwesomeIcon icon={faSpinner}/>

}

const instance = new Icons()
Object.freeze(instance)
export default instance
