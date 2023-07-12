import jwtDecode from 'jwt-decode';

export const setTokenExpiration = (accessToken) => {
    const decodedToken = jwtDecode(accessToken);
    console.log(decodedToken);
    const expirationTime = decodedToken.exp; // Expiration time in seconds
    console.log('expiration time in seconds' + " " + expirationTime)

    const currentTime = new Date().getTime();
    console.log('the current time is " "' + currentTime)
    const expiresIn = expirationTime * 1000; // Convert expiration time to milliseconds
    const expiresdate = new Date(expiresIn)
    console.log("Date of expiration:" + expiresdate)
        // const tokenExpiration = currentTime + expiresIn;
        //console.log('expires in ' + tokenExpiration)
    localStorage.setItem('tokenExpiration', expiresdate);
};


export const isTokenExpired = () => {
    const expirationDate = localStorage.getItem('tokenExpiration');
    //const currentTime = new Date().now();

    if (expirationDate <= Date.now()) {
        // Token has expired
        console.log("Token has expired");
        return true;
    } else {
        // Token is still valid
        console.log("Token is still valid");
        return false;
    };
}