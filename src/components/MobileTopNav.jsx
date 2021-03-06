import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

function MobileTopNav(props) {
    return (
        <div className="mobile-nav-wrapper">
            <nav className="mobile-nav-flex">
                {/* <div className="mobile-nav-item"> */}
                {
                    props.device ? <div className="nav-signup nav-item" style={{borderRadius: '50%'}}>
                        {
                            <img src={props.message.imgUrl || props.userPublicProfile.imgUrl} alt="avatar" style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                marginTop: '8px'
                            }}
                            onClick={() => {props.toggleProfile()}}
                            />
                        }
                    </div> : null
                }
                {/* </div> */}
                <div className="mobile-nav-item mobile-nav-home">
                    <Link to='/home' style={{
                        textDecoration: 'none',
                        color: '#000'
                    }}>Home</Link>
                </div>
            </nav>
        </div>
    )
}
const mapStateToProps = state => ({
    message: state.user.message,
    userPublicProfile: state.data.userPublicProfile
});

export default connect(mapStateToProps)(MobileTopNav);
