import { useSearchParams } from "react-router-dom";
import { Register, Login } from "../../organisms";

const Authentication: React.FC = () => {
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');

    return (
        <>
            {type === "s" && <Login />}
            {type === "r" && <Register />}
            {(type === null || (type !== "s" && type !== "r")) && <div>Bizarre</div>}
        </>
    )
}

export default Authentication;