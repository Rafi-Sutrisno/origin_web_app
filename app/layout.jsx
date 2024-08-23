import "@styles/globals.css";

import toast, { Toaster } from "react-hot-toast";
import Navbar from "@components/Navbar/Navbar";
import Provider from "@components/Provider";
import ContextProvider from "@components/ContextProvider/ContextProvider";
import Footer from "@components/Footer/Footer";

export const metadata = {
  title: "Origin",
  description: "Find your story",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/assets/app-logo.png" />
      </head>
      <body>
        <Provider>
          <ContextProvider>
            <main className="app pb-10">
              <Toaster />
              <Navbar />
              {children}
            </main>
            <Footer />
          </ContextProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
