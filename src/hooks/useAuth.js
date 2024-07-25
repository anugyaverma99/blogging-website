import { proxy, useSnapshot } from 'valtio';
import axios from 'axios';
import { isEmpty } from 'lodash-es';

// Function to decode JWT token safely
function getAuthUser() {
    const jwt = window.localStorage.getItem('jwtToken');

    if (!jwt) return {};

    try {
        const payload = atob(jwt.split('.')[1]);
        return JSON.parse(payload);
    } catch (error) {
        console.error('Failed to parse JWT token:', error);
        return {};
    }
}

const state = proxy({
    authUser: getAuthUser(),
});

const actions = {
    login: (user) => {
        console.log('login', { user, state });
        state.authUser = user;
        try {
            const token = user.token; // Assuming token is directly from user object
            if (token) {
                const encodedUser = btoa(JSON.stringify(user));
                window.localStorage.setItem('jwtToken', encodedUser);
                axios.defaults.headers.Authorization = `Bearer ${token}`;
            } else {
                console.error('No token found in user object');
            }
        } catch (error) {
            console.error('Failed to encode and store user data:', error);
        }
    },
    logout: () => {
        state.authUser = {};
        window.localStorage.removeItem('jwtToken');
        delete axios.defaults.headers.Authorization;
    }
};

function useAuth() {
    const snap = useSnapshot(state);
    console.log('snap', { snap });

    const getAuthStatus = () => !isEmpty(snap.authUser);

    return {
        ...snap,
        ...actions,
        isAuth: getAuthStatus()
    };
}

export default useAuth;
