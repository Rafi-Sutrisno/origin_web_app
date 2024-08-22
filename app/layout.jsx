import "@styles/globals.css";

import toast, { Toaster } from "react-hot-toast";
import Navbar from "@components/Navbar/Navbar";
import Provider from "@components/Provider";
import ContextProvider from "@components/ContextProvider/ContextProvider";

export const metadata = {
  title: "Origin",
  description: "Find your story",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <ContextProvider>
            <div className="main">
              <div className="gradient"></div>
            </div>

            <main className="app pb-10">
              <Toaster />
              <Navbar />
              {children}
            </main>
          </ContextProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
