import { useEffect } from "react";
import { getCabins } from "../services/apiCabins";

const Cabins = () => {
  useEffect(() => {
    getCabins()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return <div>Cabins</div>;
};

export default Cabins;
