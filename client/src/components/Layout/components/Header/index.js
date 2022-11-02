import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '../../../../assets/images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';


const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                       <img src={images.logo} alt="AILab Tools"/>
                </div>

                <div className={cx('search')}>
                    <input placeholder='Search account or name task label' spellCheck={false}/>
                    <button className={cx('clear')}>
                        <FontAwesomeIcon icon={faCircleXmark}/>
                    </button>
                    <button className={cx('loading')} >
                        <FontAwesomeIcon icon={faSpinner}/>
                        </button>      

                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>

                <div className={cx('actions')}></div>

            </div>
        </header>
    );
}

export default Header;
