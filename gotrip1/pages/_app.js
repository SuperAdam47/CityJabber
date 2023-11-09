import Aos from "aos";
import { useEffect } from "react";
import { useRouter } from "next/router";
import SrollTop from "../components/common/ScrollTop";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import "aos/dist/aos.css";
import "../styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

import { Provider } from "react-redux";
import { store } from "../app/store";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();

  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      localStorage.removeItem("user");
      Cookies.remove("token");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [router]);

  return (
    <main>
      <Provider store={store}>
        <Component {...pageProps} />
        <SrollTop />
      </Provider>
    </main>
  );
}
