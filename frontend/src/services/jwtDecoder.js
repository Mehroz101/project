import jwt_decode from "jwt-decode";

// Assuming you have a JWT token stored in `localStorage` or `sessionStorage` or received in the request headers
const token = localStorage.getItem("jwtToken"); // or you could get it from the Authorization header

if (token) {
  // Decode the JWT token
  const decodedToken = jwt_decode(token);
  console.log(decodedToken);
  // Assuming the token contains a 'userId' in the payload
  //   const userId = decodedToken.userId;  // Replace 'userId' with the actual key in your token's payload

  //   console.log("User ID:", userId);
} else {
  console.log("No token found");
}
