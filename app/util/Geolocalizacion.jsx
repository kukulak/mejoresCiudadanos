export default function Geo() {
  console.log('GEO')

  // const geolocationAPI = navigator.geolocation

  const getUserCoordinates = () => {
    if (navigator.geolocation) {
      console.log('GEO GEO-')
    }
  }

  // return getUserCoordinates()

  // if ('geolocation' in navigator) {
  //   // navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  //   console.log('Geolocalización disponible')
  // } else {
  //   console.log('Geolocalización no está disponible')
  // }

  // function successCallback(position) {
  //   const latitude = position.coords.latitude;
  //   const longitude = position.coords.longitude;
  //   console.log("Latitud:", latitude);
  //   console.log("Longitud:", longitude);
  // }

  // function errorCallback(error) {
  //   console.log("Error al obtener la ubicación:", error);
  // }
}

// type SessionData = {
//   userId: string
// }
// type SessionFlashData = {
//   error: string
// }

// const { getSession, commitSession, destroySession } =
//   createCookieSessionStorage<SessionData, SessionFlashData>(
//     {
//       // a Cookie from `createCookie` or the CookieOptions to create one
//       cookie: {
//         name: "__session",

//         // all of these are optional
//         domain: "remix.run",
//         // Expires can also be set (although maxAge overrides it when used in combination).
//         // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
//         //
//         // expires: new Date(Date.now() + 60_000),
//         httpOnly: true,
//         maxAge: 60,
//         path: "/",
//         sameSite: "lax",
//         secrets: ["s3cret1"],
//         secure: true,
//       },
//     }
//   );

//   export { getSession, commitSession, destroySession };
