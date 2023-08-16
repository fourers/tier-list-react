import data from "../default_data.json";
import { getImgStyle } from "./style";

export default function GhostItem(props) {
    return <img src={data.items[props.id].src} style={getImgStyle(true)} />;
}
