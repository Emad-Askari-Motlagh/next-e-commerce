import Header from "@/components/Header"
import Footer from "src/components/Footer"
import Description_line from "src/screens/desciptionLine"
export default function PrimaryLayout(props) {
  //persist product filters and user on server side renders

  return (
    <div style={{ position: "relative" }}>
      <Description_line />
      <Header />

      {props.children}

      <Footer />
    </div>
  )
}
