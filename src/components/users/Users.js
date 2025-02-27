import React from 'react'
import UserItem from './UserItem';
import Spinner from '../layout/spinner';
import PropTypes from 'prop-types'


const User = ({ loading, users }) => {
    if (loading) {
        return <Spinner />
    } else {
        return (
            <div style={userStyle} >
                {users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        )
    }
}



const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3 , 1fr)',
    gridGap: '1rem'
}

User.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

export default User
