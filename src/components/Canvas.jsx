import { useEffect, useRef } from "react";

export default function Canvas(props) {
    const ref = useRef();

    useEffect(() => {
        const canvas = ref.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.height = props.draw.height;
        canvas.width = props.draw.width;
        context.drawImage(props.draw, 0, 0);
    }, [props.draw]);

    return <canvas ref={ref} style={props.style} />;
}
