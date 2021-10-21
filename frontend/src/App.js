import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import { useSelector } from "react-redux"
import Register from "./components/Register";
import { styled } from "@mui/system";
import lemon from "./assets/lemon.jpg"

const Root = styled("div")({
  background: `url(${lemon})`,
  textAlign: "center",
  minHeight: "100vh",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat"
})

export default function App() {
  const modal = useSelector((store) => store.baseLogin.modal)


  return (
    <Root>
      <Header />
      <div style={{ textAlign: "center" }}>
        <Homepage />
        {modal.login && <Login />}
        {modal.register && <Register />}
      </div>
    </Root>
  )
}
