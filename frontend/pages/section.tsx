import { Footer } from "../Components/Footer";
import { Login } from "./Login";
import { Signup } from "./Signup";
export function Section() {
  return (
    <>
      <section className="bg-[url(../public/main_page.png)] h-screen bg-no-repeat bg-cover bg-center py-20 sm:py-32 flex justify-center items-center flex-wrap"></section>
      <Footer />
    </>
  );
}

export function SignupPage() {
  return (
    <>
      <section className="bg-[url(../public/main_page.png)] h-screen bg-no-repeat bg-cover bg-center py-20 sm:py-32 flex justify-center items-center flex-wrap ">
        <Signup />
      </section>
    </>
  );
}

export function LoginPage() {
  return (
    <>
      <section className="bg-[url(../public/main_page.png)] h-screen bg-no-repeat bg-cover bg-center py-20 sm:py-32 flex justify-center items-center flex-wrap">
        <Login />
      </section>
    </>
  );
}
