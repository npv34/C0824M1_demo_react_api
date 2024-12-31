import {Outlet} from "react-router";
import HeaderHome from "../HeaderHome/HeaderHome";

function MasterHome() {
    return (
        <div>
            <HeaderHome/>
            <Outlet/>
        </div>
    );
}

export default MasterHome;