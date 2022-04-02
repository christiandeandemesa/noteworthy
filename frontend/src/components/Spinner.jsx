// THIS FILE HAS BEEN DOUBLE-CHECKED FOR BUGS
// This is the Spinner component.

// imports all Im react-icons.
import * as ImIcons from 'react-icons/im';
import styles from './Spinner.module.scss';

function Spinner() {
    return (
        <div id={styles.spinner}>
            {/* Example of using a specific ImIcon. */}
            <ImIcons.ImSpinner9 className={styles.icon}/>
        </div>
    )
}

export default Spinner;