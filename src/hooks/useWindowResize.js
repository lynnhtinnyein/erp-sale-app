import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScreenSize } from "../store/reducers/uiReducer";

const useWindowResize = () => {
    const dispatch = useDispatch();

    useEffect( () => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;

            const breakpoints = {
                sm: 640,
                md: 768,
                lg: 1024,
                xl: 1280,
            };

            const currentScreenSize = Object.keys(breakpoints).find(
                size => screenWidth < breakpoints[size]
            );

            dispatch(setScreenSize(currentScreenSize || 'xl'));
        }

        handleResize(); //initial resize

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return null;
}

export default useWindowResize;