import {createGlobalState} from "react-use";

const useGlobalValue = createGlobalState<string>('');

export function useSharedState() {

    const [sharedState, setSharedState] = useGlobalValue();

    return { sharedState, setSharedState };
}
