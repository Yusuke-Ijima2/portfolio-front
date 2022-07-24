import "../styles/global.css";
import { Auth0Provider } from "@auth0/auth0-react";

function MyApp({ Component, pageProps }) {
  //ログイン後のリダイレクト先を指定
  const redirectUrl = `${process.env["NEXT_PUBLIC_BASE_URL"]}/login`;
  return (
    <Auth0Provider
      domain={process.env["NEXT_PUBLIC_AUTH0_DOMAIN"]!}
      clientId={process.env["NEXT_PUBLIC_AUTH0_CLIENT_ID"]!}
      audience={process.env["NEXT_PUBLIC_AUTH0_AUDIENCE"]!}
      redirectUri={redirectUrl}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

export default MyApp;